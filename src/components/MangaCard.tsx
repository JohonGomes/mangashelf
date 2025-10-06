// src/components/MangaCard.tsx
import { Manga } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceholderImage } from './PlaceholderImage'; // 1. Importe nosso novo componente

interface MangaCardProps {
    manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
    return (
        <Link href={`/mangas/${manga.id}`} className="flex">
            <Card className="flex flex-col hover:border-primary transition-colors w-full">
                <CardHeader>
                    <CardTitle className="truncate">{manga.title}</CardTitle>
                    <CardDescription>{manga.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center justify-center p-0">
                    <div className="relative w-full aspect-[2/3]"> {/* Usamos aspect-ratio para manter a proporção */}
                        {manga.cover ? ( // 2. Se tiver capa, use a imagem
                            <Image
                                src={manga.cover}
                                alt={`Capa de ${manga.title}`}
                                fill
                                className="object-cover rounded-t-lg"
                            />
                        ) : ( // 3. Se não tiver, use nosso placeholder
                            <PlaceholderImage />
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4">
                    <Badge variant="outline">{manga.status}</Badge>
                </CardFooter>
            </Card>
        </Link>
    );
}