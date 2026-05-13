import { NextResponse } from "next/server";
import { createCatalogItem, listCollection } from "@/lib/server/catalog-repository";
import { requireAdmin } from "@/lib/server/auth";

export async function GET() {
  const items = await listCollection("products");
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const body = await request.json();
    const result = await createCatalogItem("products", body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create product." },
      { status: 400 },
    );
  }
}

