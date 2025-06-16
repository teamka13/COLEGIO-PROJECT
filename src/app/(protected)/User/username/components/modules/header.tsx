"use client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg font-montserrat">
      <div
        className="max-w-7xl mx-auto px-3 py-2
      "
      >
        <div className="flex items-center justify-between">
          <Link
            href="/User/username/Home"
            className="flex flex-col group px-3 py-1 rounded-lg transition-all duration-200 hover:bg-orange-500 hover:shadow-md cursor-pointer"
          >
            <h1 className="text-2xl font-montserrat font-bold text-orange-500 transition-colors group-hover:text-gray-900">
              Administración
            </h1>
            <p className="text-lg font-semibold text-gray-300 transition-colors group-hover:text-gray-200">
              Plantel 05 García
            </p>
          </Link>

          <button
            type="button"
            className="flex items-center justify-center px-4 py-2  bg-orange-600 hover:bg-orange-800 
             rounded-md  transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-900 
             active:bg-orange-600 active:scale-90 active:shadow-inner active:opacity-90 text-black"
          >
            <LogOutIcon className="w-5 h-5 mr-2" />
            <span className="font-bold">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
}
