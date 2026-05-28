import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!serviceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    const body = await req.json();

    const { user_id, email } = body;

    const { data, error } = await supabase
      .from("login_logs")
      .insert([
        {
          user_id,
          email,
        },
      ]);

    if (error) {

      console.log(error);

      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      {
        status: 500,
      }
    );
  }
}