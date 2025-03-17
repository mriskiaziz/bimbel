import prisma from "@/lib/prisma";

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
