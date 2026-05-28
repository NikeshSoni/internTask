"use client";

import { supabaseAdmin } from "../lib/supabase";

export default function LoginButton() {

  const login = async () => {
    await supabaseAdmin.auth.signInWithOAuth({
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