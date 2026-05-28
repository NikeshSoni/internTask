

// app/api/log-login/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { user_id, email } = body;

    if (!user_id || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing fields",
        },
        { status: 400 }
      );
    }

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
        { status: 500 }
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
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}