import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const collectionName =
      url.searchParams.get("collectionName") || "defaultCollection";

    const allData = await prisma[collectionName].findMany();
    return new Response(JSON.stringify(allData), { status: 200 });
  } catch (error) {
    return new Response("Error fetching items", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = JSON.parse(formData.get("data"));
    const collectionName = JSON.parse(formData.get("collection"));
    const file = formData.get("file");

    console.log(collectionName);
    console.log(data);

    const newItem = await prisma[collectionName].create({ data: data });
    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error adding item" }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");
    const data = JSON.parse(formData.get("data"));
    const collectionName = JSON.parse(formData.get("collection"));
    const file = formData.get("file");

    const updatedItem = await prisma[collectionName].update({
      where: { id },
      data: data,
    });
    return new Response(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    return new Response("Error updating item", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, imageUrl, collectionName } = await request.json();
    await prisma[collectionName].delete({ where: { id } });
    return new Response("Item deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting item", { status: 500 });
  }
}
