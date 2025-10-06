// src/components/MangaCard.tsx
import { Manga } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceholderImage } from './PlaceholderImage';
import { StarRating } from './StarRating';
import { Button } from './ui/button';
import { DeleteMangaButton } from './DeleteMangaButton';

interface MangaCardProps {
    manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden">
            {/* --- INÍCIO DA CORREÇÃO --- */}
            {/* Caixa Externa: Cria a moldura com padding */}
            <div className="p-4">
                {/* Caixa Interna: Define a proporção e serve de âncora para a imagem */}
                <div className="relative w-full aspect-[2/3]">
                    {manga.cover ? (
                        <Image
                            src={manga.cover}
                            alt={`Capa de ${manga.title}`}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <PlaceholderImage />
                    )}
                </div>
            </div>
            {/* --- FIM DA CORREÇÃO --- */}

            {/* O resto do card. Usei pt-0 (padding-top: 0) para ajustar o espaçamento */}
            <CardHeader className="flex-grow p-4 pt-0">
                <CardTitle className="truncate text-lg">{manga.title}</CardTitle>
                <CardDescription className="truncate">{manga.author}{manga.year ? `, ${manga.year}` : ''}</CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-2">
                <div className="flex justify-between items-center">
                    <Badge variant="secondary">{manga.genre}</Badge>
                    <StarRating rating={manga.rating} />
                </div>
            </CardContent>

            <CardFooter className="p-2 border-t grid grid-cols-3 gap-1">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/mangas/${manga.id}`}>Visualizar</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/mangas/${manga.id}/edit`}>Editar</Link>
                </Button>
                <div className="[&>div]:w-full">
                    <DeleteMangaButton mangaId={manga.id} />
                </div>
            </CardFooter>
        </Card>
    );
}