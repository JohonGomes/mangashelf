// src/app/mangas/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DeleteMangaButton } from '@/components/DeleteMangaButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceholderImage } from '@/components/PlaceholderImage';

interface MangaDetailsPageProps {
    params: { id: string };
}

export default async function MangaDetailsPage({ params }: MangaDetailsPageProps) {
    const manga = await prisma.manga.findUnique({
        where: { id: params.id },
    });

    if (!manga) {
        notFound();
    }

    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center space-y-4">
                    <div className="relative w-[300px] h-[450px] rounded-lg shadow-lg overflow-hidden">
                        {manga.cover ? (
                            <Image
                                src={manga.cover}
                                alt={`Capa de ${manga.title}`}
                                fill
                                className="object-cover"
                                // Adicionando a propriedade 'sizes' para otimização
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <PlaceholderImage />
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <Button asChild>
                            <Link href={`/mangas/${manga.id}/edit`}>Editar</Link>
                        </Button>
                        <DeleteMangaButton mangaId={manga.id} />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <h1 className="text-4xl font-bold">{manga.title}</h1>
                    <p className="text-xl text-muted-foreground">{manga.author}</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge>{manga.genre}</Badge>
                        <Badge variant="secondary">{manga.status}</Badge>
                        {manga.year && <Badge variant="outline">Ano: {manga.year}</Badge>}
                        {manga.pages && <Badge variant="outline">Páginas: {manga.pages}</Badge>}
                        {manga.rating && <Badge variant="outline">Nota: {manga.rating}/5</Badge>}
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-semibold mt-6">Sinopse</h2>
                        <p>{manga.synopsis || 'Nenhuma sinopse disponível.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}