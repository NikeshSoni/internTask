"use client";

import { getSupabaseClient } from "../lib/supabase";

export default function LoginButton() {

  const supabase = getSupabaseClient();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <button
        onClick={login}
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
      >
        Login with Google
      </button>
    </div>
  );
}