"use client";
import Link from "next/link";

import { motion } from "framer-motion";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white text-4xl md:text-5xl font-bold mb-4"
      >
        Sistema de Registro Institucional
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
      >
        Desarrollado por Diego Alejandro Domínguez Gómez. App web que permite la
        gestión de entradas, comedor, reportes y más.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
      >
        <Link
          href={`/User/username/Home`}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Empezar
        </Link>
      </motion.div>
    </div>
  );
}
