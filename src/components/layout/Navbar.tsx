"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { appConfig } from "@/config/appConfig";
import { Search, ShoppingCart, User, Menu, Bell } from "lucide-react";

export const Navbar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 sm:gap-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <button className="lg:hidden p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md transition-transform group-hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white hidden sm:block">
                {appConfig.appName}
              </span>
            </Link>
          </div>

          {/* Search Bar (Center) */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for items, brands, or categories..."
                className="w-full rounded-full border border-gray-200/80 bg-gray-50/80 dark:bg-gray-900/80 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-950 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner transition-all"
              />
              <button className="absolute inset-y-1 right-1 px-4 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-sm hidden lg:block">
                Search
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="hidden sm:flex p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">
              <Bell size={22} />
            </button>
            <button className="flex p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">
              <ShoppingCart size={22} />
            </button>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{user.email?.split('@')[0]}</span>
                  <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                </div>
                <button
                  onClick={() => setUser(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                  title="Logout"
                >
                  <User size={20} />
                </button>
                {user.role === "admin" && (
                  <Link href="/dashboard" className="hidden lg:flex px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-full transition">
                    Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="hidden sm:flex px-4 py-2 text-sm font-bold text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-bold text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 shadow-md transition transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-8 py-2.5 overflow-x-auto no-scrollbar text-sm font-medium text-gray-600 dark:text-gray-400">
            {['All Categories', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Motors', 'Collectibles', 'Deals'].map((cat) => (
              <li key={cat}>
                <button className="whitespace-nowrap hover:text-black dark:hover:text-white transition-colors relative group">
                  {cat}
                  <span className="absolute -bottom-2.5 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
