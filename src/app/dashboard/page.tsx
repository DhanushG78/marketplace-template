"use client";

import { useAuth } from "@/hooks/useAuth";
import { appConfig } from "@/config/appConfig";

export default function Dashboard() {
  // 1. Kick out anyone who isn't authenticated as an admin
  const { user } = useAuth("admin");

  // Since useAuth redirects asynchronously, handle the blip where `user` is strictly null
  if (!user || user.role !== "admin") return null;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-white dark:bg-gray-950">
      <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Manage {appConfig.entity.route} securely. <span className="text-blue-600 font-semibold">Only admins can see this.</span>
        </p>
      </header>

      <section className="mt-8 bg-gray-50 border border-gray-100 p-8 rounded-2xl dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Welcome back, {user.email}!
        </h3>
        <p className="text-gray-500 mt-2">
          Your dashboard integration is active and secure.
        </p>
      </section>
    </div>
  );
}
