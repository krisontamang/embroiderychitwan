import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";

type AdminCheck =
  | { ok: true; demoMode: boolean; userId?: string }
  | { ok: false; response: NextResponse };

export async function requireAdmin(request: Request): Promise<AdminCheck> {
  const supabase = createAdminSupabase();

  if (!supabase) {
    return { ok: true, demoMode: true };
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Admin sign-in required." },
        { status: 401 },
      ),
    };
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid admin session." },
        { status: 401 },
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "This account is not an admin." },
        { status: 403 },
      ),
    };
  }

  return { ok: true, demoMode: false, userId: data.user.id };
}

