import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default function withAuth(middleware, requireAuth = []) {
  const startsWithAnyPrefix = (link, array) => {
    for (let prefix of array) {
      if (link.startsWith(prefix)) {
        return true;
      }
    }
    return false;
  };

  return async (req, next) => {
    const pathname = req.nextUrl.pathname;

    if (pathname == "/login") {
      const token = await getToken({ req, secret });

      if (token) {
        let url = new URL(`/${token.role}`, req.url);
        return NextResponse.redirect(url);
      } else {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store, max-age=0");
        return response;
      }
    }

    if (startsWithAnyPrefix(pathname, requireAuth)) {
      const token = await getToken({ req, secret });

      if (!token) {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      } else {
        if (!pathname.startsWith(`/${token.role}`)) {
          const url = new URL(`/${token.role}`, req.url);
          return NextResponse.redirect(url);
        }
      }
    }

    // Tambahkan logika untuk pengecekan ujian jika path-nya /siswa/ujian
    if (pathname.startsWith("/siswa/ujian")) {
      const token = await getToken({ req, secret });

      if (token) {
        // Ambil hasil ujian siswa dari API
        const score = await fetch(
          `${process.env.NEXTAUTH_URL}/api/score?siswaId=${token.id}`
        );
        const scorejson = await score.json();

        // Bandingkan tanggal ujian dengan hari ini
        const currentDate = new Date();
        const examDate = new Date(scorejson.tanggal);

        // Jika ujian sudah selesai (tanggal ujian kurang dari hari ini), arahkan ke /siswa/hasil
        if (examDate < currentDate) {
          const url = new URL("/siswa/hasil", req.url);
          return NextResponse.redirect(url);
        }
      }
    }

    // Lanjutkan ke middleware jika tidak ada kondisi yang dipenuhi
    return middleware(req, next);
  };
}
