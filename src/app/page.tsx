// src/app/page.tsx
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <h1 className="text-5xl md:text-6xl font-logo mb-6 tracking-tight">
        Bem-vindo à MangaShelf!
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
        A sua biblioteca pessoal para organizar, explorar e celebrar a sua coleção de mangás.
      </p>

      {/* Imagem */}
      <div className="relative w-full max-w-3xl aspect-video mb-12 rounded-lg overflow-hidden shadow-xl">
        <Image
          src="/bemvindo.png"
          alt="Prateleira de mangás"

          width={1280} // Largura original da imagem
          height={720} // Altura original da imagem
          className="w-full h-auto" // Faz a imagem ser responsiva, mantendo a proporção
          priority
        />
      </div>

      {/* Botão para a Estante */}
      <Button size="lg" asChild>
        <Link href="/estante">
          Explorar Minha Estante
        </Link>
      </Button>
    </div>
  );
}