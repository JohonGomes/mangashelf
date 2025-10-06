// src/app/mangas/[id]/edit/page.tsx

import { updateManga } from '@/actions/manga.actions';
import { MangaForm } from '@/components/MangaForm';
import { prisma } from '@/lib/prisma'; // 1. Usando nosso "Carteiro Mestre" (Prisma Singleton)
import { notFound } from 'next/navigation';

// As propriedades da página incluem os parâmetros da URL
interface MangaEditPageProps {
    params: { id: string };
}

export default async function MangaEditPage({ params }: MangaEditPageProps) {
    // 2. Busca no banco de dados o mangá específico com o ID da URL
    const manga = await prisma.manga.findUnique({
        where: { id: params.id },
    });

    // Se não encontrar, mostra a página 404
    if (!manga) {
        notFound();
    }

    // 3. Prepara a ação de update, "amarrando" o ID do mangá a ela.
    // Assim, quando o formulário for enviado, a função updateManga saberá qual registro atualizar.
    const updateMangaWithId = updateManga.bind(null, manga.id);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Editando: {manga.title}</h1>

            {/* 4. Renderiza o formulário, passando os dados iniciais e a ação preparada */}
            <MangaForm initialData={manga} formAction={updateMangaWithId} />
        </div>
    );
}