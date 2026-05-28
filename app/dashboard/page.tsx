// Add this at the very top of dashboard/page.tsx


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
    // <div className="min-h-screen bg-gray-100 p-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between mb-8">
    //     <div>
    //       <h1 className="text-4xl font-bold text-gray-800">
    //         Login Dashboard
    //       </h1>

    //       <p className="text-gray-500 mt-1">
    //         Track all user login activity
    //       </p>
    //     </div>

    //     <div className="bg-black text-white px-5 py-3 rounded-2xl shadow-lg">
    //       <p className="text-sm text-gray-300">
    //         Total Logins
    //       </p>

    //       <h2 className="text-2xl font-bold">
    //         {logs.length}
    //       </h2>
    //     </div>
    //   </div>

    //   {/* Logs */}
    //   <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    //     {logs.map((log) => (
    //       <div
    //         key={log.id}
    //         className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition-all duration-300"
    //       >
    //         {/* Avatar */}
    //         <div className="flex items-center gap-4 mb-4">
    //           <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
    //             {log.email?.charAt(0).toUpperCase()}
    //           </div>
    //           <div>
    //             <h2 className="font-semibold text-gray-800">
    //               {log.email}
    //             </h2>

    //             <p className="text-sm text-gray-500">
    //               User Login
    //             </p>
    //           </div>
    //         </div>
    //         {/* Login Time */}
    //         <div className="bg-gray-100 rounded-xl p-3">
    //           <p className="text-sm text-gray-500 mb-1">
    //             Login Time
    //           </p>
    //           <p className="font-medium text-gray-800">
    //             {new Date(log.login_time).toLocaleString()}
    //           </p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Empty State */}
    //   {logs.length === 0 && (
    //     <div className="bg-white rounded-2xl shadow-md p-10 text-center mt-10">
    //       <h2 className="text-2xl font-bold text-gray-700 mb-2">
    //         No Login Logs
    //       </h2>
    //       <p className="text-gray-500">
    //         No users have logged in yet.
    //       </p>
    //     </div>
    //   )}
    // </div>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5"> Dashboard </h1>
      <div className="space-y-3">
        {logs.map((log) => (<div key={log.id} className="border p-4 rounded-xl" >
          <p>{log.email}</p>
          <p>{log.login_time}</p>
        </div>))} 
      </div> 
    </div>
  );
}