// src/components/MangaCard.tsx
import { Manga } from '@prisma/client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';

// Definimos as propriedades que o nosso Card vai receber
interface MangaCardProps {
    manga: Manga;
}

export function MangaCard({ manga }: MangaCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="truncate">{manga.title}</CardTitle>
                <CardDescription>{manga.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center">
                <div className="relative w-full h-64">
                    <Image
                        // Se não houver capa, usamos um placeholder
                        src={manga.cover || 'https://via.placeholder.com/200x300.png?text=Sem+Capa'}
                        alt={`Capa de ${manga.title}`}
                        fill
                        className="object-contain"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Badge variant="outline">{manga.status}</Badge>
            </CardFooter>
        </Card>
    );
}