"use client";

import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoHelpBuoyOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../dashboard/sideBar";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeList, setActiveList] = useState<string | null>(null);

  const handleClick = () => setOpen((prev) => !prev);

  const handleListClick = (listId: string) => {
    setActiveList((prev) => (prev === listId ? null : listId));
    if (!open) setOpen(true);
  };

  return (
    <aside
      className={`h-screen flex flex-col duration-500 bg-gray-950 border-r-4 border-gray-700 text-white shadow-lg ${
        open ? "w-70" : "w-15"
      }`}
    >
      {/* Header */}
      <div className="px-4 h-20 flex items-center justify-between overflow-hidden">
        <Image
          src="/images/DES.png"
          alt="Logo"
          width={200}
          height={10}
          className={` max-w-[200px] transition-all duration-500 ${
            open ? "opacity-100" : "w-0 opacity-0"
          }`}
        />
        <button
          onClick={handleClick}
          className="relative z-10 rounded-md hover:bg-orange-600 hover:text-black  active:scale-85 active:shadow-inner active:opacity-90 transition-all duration-300 "
        >
          <MdMenuOpen
            size={33}
            className={`transition-transform duration-300 ${
              !open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <ul className="flex-1 mt-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="px-3 py-2 mt-3 rounded-md cursor-pointer flex flex-col  relative 
                 group hover:bg-orange-500 hover:text-black  font-semibold font-montserrat
                 active:scale-95 active:shadow-inner active:opacity-90
                "
            onClick={() => handleListClick(item.id)}
          >
            {/* Ícono y etiqueta */}
            <div className="flex items-center gap-1">
              <div
                className={`text-xl transition-colors duration-300 ${
                  open ? "text-current" : "group-hover:text-black"
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`transition-all whitespace-nowrap ${
                  open
                    ? "opacity-100 translate-x-1 duration-500"
                    : "opacity-0 -translate-x-4 duration-100"
                }`}
              >
                {item.label}
              </p>
            </div>

            {/* Tooltip (cuando el menú está contraído) */}
            {!open && (
              <p
                className="absolute left-full ml-1 px-3 py-1 rounded-md bg-orange-400 text-black shadow-lg 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                     transition-all duration-300 whitespace-nowrap z-10 font-semibold font-montserrat"
              >
                {item.label}
              </p>
            )}

            {/* Submenús */}
            {open && activeList === item.id && (
              <ul
                className="ml-6 pl-2 border-l-2 border-orange-500 space-y-2 overflow-hidden 
                     transition-all duration-300 ease-out origin-top"
                onClick={(e) => e.stopPropagation()}
              >
                {item.subMenu.map((subItem) => (
                  <li key={subItem.path} onClick={(e) => e.stopPropagation()}>
                    <Link
                      className="px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-2 whitespace-nowrap 
                           bg-transparent hover:bg-orange-600 text-gray-700 hover:text-black
                           transition-colors duration-300" // Solo transición para colores
                      href={`/User/username/${subItem.path}`}
                    >
                      {subItem.icon && (
                        <span className="text-lg transition-colors duration-300">
                          {subItem.icon}
                        </span>
                      )}
                      <span className="transition-colors duration-300">
                        {subItem.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pb-4">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">
          <IoHelpBuoyOutline size={30} />
          <div
            className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${
              open ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            <p className="font-semibold">Diego</p>
            <span className="text-xs text-gray-300">
              Administrador principal
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
