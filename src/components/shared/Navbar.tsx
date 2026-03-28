"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { appConfig } from "@/config/appConfig";

export const Navbar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90 shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Marketplace Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {appConfig.appName}
          </span>
        </Link>

        {/* Action Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Home
          </Link>

          {user?.role === "admin" && (
            <Link href="/dashboard" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Dashboard
            </Link>
          )}

          {/* User Auth Container */}
          <div className="ml-2 flex items-center gap-4 border-l border-gray-200 pl-6 dark:border-gray-800">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};
