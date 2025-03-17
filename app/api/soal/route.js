import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const model = "soal"; // pastikan model ini sesuai dengan skema prisma Anda

    const paketId = searchParams.get("paketId");

    if (paketId) {
      const data = await prisma[model].findMany({ where: { paketId } });

      if (data.length === 0) {
        return new Response(
          JSON.stringify({
            error: `${model} dengan paketId ${paketId} tidak ditemukan`,
          }),
          { status: 404 }
        );
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "paketId diperlukan" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
    });
  }
}
