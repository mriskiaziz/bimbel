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

    const id = searchParams.get("id");

    if (id) {
      const data = await prisma[model].findUnique({ where: { id } });
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
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");

    if (!model || !prisma[model]) {
      return new Response(JSON.stringify({ error: "Model tidak ditemukan" }), {
        status: 400,
      });
    }

    const body = await req.json();
    const newData = await prisma[model].create({ data: body });

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
    const model = searchParams.get("model");

    if (!model || !prisma[model]) {
      return new Response(JSON.stringify({ error: "Model tidak ditemukan" }), {
        status: 400,
      });
    }

    const id = searchParams.get("id");
    if (!id)
      return new Response(JSON.stringify({ error: "ID diperlukan" }), {
        status: 400,
      });

    const body = await req.json();
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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");

    if (!model || !prisma[model]) {
      return new Response(JSON.stringify({ error: "Model tidak ditemukan" }), {
        status: 400,
      });
    }

    const id = searchParams.get("id");
    if (!id)
      return new Response(JSON.stringify({ error: "ID diperlukan" }), {
        status: 400,
      });

    await prisma[model].delete({ where: { id } });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan" }), {
      status: 500,
    });
  }
}
