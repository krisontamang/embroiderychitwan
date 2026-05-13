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
    const result = await updateCatalogItem("services", id, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update service." },
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
    const result = await deleteCatalogItem("services", id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete service." },
      { status: 400 },
    );
  }
}

