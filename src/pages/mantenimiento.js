import React from "react";
import Layout from "@theme/Layout";
import { HardHat } from "lucide-react";

export default function Maintenance() {
  return (
    <Layout title="Mantenimiento" description="Contenido en mantenimiento">
      <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-20 bg-[var(--ifm-background-color)]">
        <div className="max-w-2xl">
          {/* Icono de mantenimiento estilo obras */}
          <HardHat className="w-24 h-24 text-yellow-400 border-4 border-black rounded-full mx-auto mb-6 animate-bounce" />

          <h1 className="text-4xl md:text-5xl font-bold [color:var(--color-text-title)] mb-6">
            Mantenimiento
          </h1>

          <p className="text-lg [color:var(--color-text-description)] mb-6">
            Este módulo se está actualizando para el curso actual.  
            El contenido del año pasado no está disponible temporalmente.
          </p>
        </div>
      </main>
    </Layout>
  );
}