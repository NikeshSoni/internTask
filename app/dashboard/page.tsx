"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { supabaseAdmin } from "../lib/supabase";

export default function Dashboard() {

  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {

    const load = async () => {
      try {
        // Get User
        const {
          data: { user },
          error: userError,
        } = await supabaseAdmin.auth.getUser();

        console.log(user, "USER");

        if (userError) {
          console.log(userError);
          return;
        }

        if (!user) {
          console.log("No user found");
          return;
        }
        // Call API
        const response = await fetch("/api/log-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            email: user.email,
          }),
        });

        const result = await response.json();
        console.log(result, "API RESULT");
        // Fetch Logs
        const { data, error } = await supabaseAdmin
          .from("login_logs")
          .select("*")
          .order("login_time", { ascending: false });
        console.log(data, "DATA");
        console.log(error, "ERROR");

        if (error) {
          console.log(error);

          return;
        }

        setLogs(data || []);

      } catch (err) {

        console.log(err);

      }
    };

    load();

  }, []);

  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5"> Dashboard </h1>
        <div className="space-y-3">
          {logs.map((log) => (<div key={log.id} className="border p-4 rounded-xl" >
            <p>{log.email}</p>
            <p>{log.login_time}</p>
          </div>))}
        </div>
      </div>
    </>
  );
}