import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");

    if (!model || !prisma[model]) {
      return new Response(JSON.stringify({ error: "Model tidak ditemukan" }), {
        status: 400,
      });
    }

    const email = searchParams.get("email");

    if (email) {
      const data = await prisma[model].findUnique({ where: { email } });
      if (!data)
        return new Response(
          JSON.stringify({ error: `${model} tidak ditemukan` }),
          { status: 404 }
        );
      return new Response(JSON.stringify(data), { status: 200 });
    }

    const allData = await prisma[model].findMany();
    return new Response(JSON.stringify(allData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const model = "akunPengguna";
    const body = await req.json();
    const data = { ...body, password: await hashPassword(body.password) };
    const newData = await prisma[model].create({ data: data });

    return new Response(JSON.stringify(newData), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const model = "akunPengguna";

    const id = searchParams.get("id");
    if (!id)
      return new Response(JSON.stringify({ error: "ID diperlukan" }), {
        status: 400,
      });

    const body = await req.json();
    const getData = await prisma[model].findUnique({
      where: { email: body.email },
    });

    // Memeriksa apakah password baru berbeda dari password yang ada di database
    if (body.password && body.password !== getData.password) {
      // Hash password baru jika berbeda
      const hashedPassword = await hashPassword(body.password);

      // Ganti password dengan yang sudah di-hash
      body.password = hashedPassword;
    }

    // Update data akun pengguna
    const updatedData = await prisma[model].update({
      where: { id },
      data: body,
    });

    return new Response(JSON.stringify(updatedData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
    });
  }
}
