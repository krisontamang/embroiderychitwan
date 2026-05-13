import { NextResponse } from "next/server";
import { deleteCatalogItem, updateCatalogItem } from "@/lib/server/catalog-repository";
import { requireAdmin } from "@/lib/server/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const result = await updateCatalogItem("gallery", id, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update gallery item." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const { id } = await context.params;
    const result = await deleteCatalogItem("gallery", id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete gallery item." },
      { status: 400 },
    );
  }
}

