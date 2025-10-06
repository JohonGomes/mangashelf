// src/components/DeleteMangaButton.tsx
'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { deleteManga } from '@/actions/manga.actions';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteMangaButtonProps {
    mangaId: string;
}

export function DeleteMangaButton({ mangaId }: DeleteMangaButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteManga(mangaId);

            if (result.success) {
                // 1. Mostramos a notificação primeiro
                toast.success(result.message);

                // 2. Usamos um pequeno atraso para garantir que a notificação seja visível
                //    antes de a página mudar.
                setTimeout(() => {
                    router.push('/estante');
                }, 800); // 0.8 segundos de atraso

            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="w-full">Apagar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isto irá remover permanentemente o mangá da sua estante.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                        {isPending ? 'Apagando...' : 'Sim, apagar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}