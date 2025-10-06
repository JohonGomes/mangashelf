// src/app/page.tsx
import { MangaCard } from '@/components/MangaCard';
import { Button } from '@/components/ui/button';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

// Função para buscar os mangás
async function getMangas() {
  const mangas = await prisma.manga.findMany({
    orderBy: {
      createdAt: 'desc', // Mostra os mais recentes primeiro
    },
  });
  return mangas;
}

// A página agora é uma função assíncrona!
export default async function Home() {
  const mangas = await getMangas();

  return (
    <div className="container mx-auto py-10">
      {mangas.length === 0 ? (
        // Se não houver mangás, mostre esta mensagem
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Sua estante está vazia!</h2>
          <p className="mt-2 text-muted-foreground">
            Que tal adicionar seu primeiro mangá?
          </p>
          <Button asChild className="mt-4">
            <Link href="/mangas/new">Adicionar Mangá</Link>
          </Button>
        </div>
      ) : (
        // Se houver mangás, mostre a grade
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}