import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.phone || !body.message) {
    return NextResponse.json({ error: "Name, phone, and details are required." }, { status: 400 });
  }

  const supabase = createAdminSupabase();

  if (!supabase) {
    return NextResponse.json({ ok: true, source: "demo" });
  }

  const { error } = await supabase.from("order_inquiries").insert({
    name: body.name,
    phone: body.phone,
    email: body.email ?? null,
    order_type: body.orderType ?? null,
    payment_preference: body.paymentPreference ?? null,
    budget: body.budget ?? null,
    timeline: body.timeline ?? null,
    message: body.message,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, source: "supabase" }, { status: 201 });
}
