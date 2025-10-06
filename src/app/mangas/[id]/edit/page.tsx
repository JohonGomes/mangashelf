// src/app/mangas/[id]/edit/page.tsx
import { updateManga } from '@/actions/manga.actions';
import { MangaForm } from '@/components/MangaForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface MangaEditPageProps {
    params: { id: string };
}

export default async function MangaEditPage({ params }: MangaEditPageProps) {
    const manga = await prisma.manga.findUnique({
        where: { id: params.id },
    });

    if (!manga) {
        notFound();
    }

    const updateMangaWithId = updateManga.bind(null, manga.id);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Editando: {manga.title}</h1>
            <MangaForm initialData={manga} formAction={updateMangaWithId} />
        </div>
    );
}