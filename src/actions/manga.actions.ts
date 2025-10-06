// src/actions/manga.actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Esquema de validação com Zod
const MangaSchema = z.object({
    title: z.string().min(1, 'O título é obrigatório.'),
    author: z.string().min(1, 'O autor é obrigatório.'),
    genre: z.enum(['SHOUJO', 'SHONEN', 'ACAO', 'MENINAS_MAGICAS', 'ISEKAI', 'DRAMA', 'ROMANCE', 'COMEDIA']),
    status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']),
    year: z.coerce.number().optional(),
    pages: z.coerce.number().optional(),
    rating: z.coerce.number().min(1).max(5).optional(),
    synopsis: z.string().optional(),
    cover: z.string().url('Insira uma URL válida.').optional().or(z.literal('')),
});

/**
 * Ação para criar um novo mangá no banco de dados.
 */
export async function createManga(formData: FormData) {
    const formValues = Object.fromEntries(formData.entries());
    const validatedFields = MangaSchema.safeParse(formValues);

    if (!validatedFields.success) {
        console.error('ERRO DE VALIDAÇÃO:', validatedFields.error.flatten());
        return { error: 'Dados inválidos.' };
    }

    try {
        await prisma.manga.create({
            data: validatedFields.data,
        });
    } catch (error) {
        console.error('ERRO AO SALVAR NO BANCO:', error);
        return { error: 'Não foi possível criar o mangá no banco de dados.' };
    }

    revalidatePath('/');
    redirect('/');
}

/**
 * Ação para deletar um mangá do banco de dados usando o ID.
 */
export async function deleteManga(id: string) {
    try {
        await prisma.manga.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Falha ao deletar o mangá:", error);
        return { error: 'Não foi possível deletar o mangá.' };
    }

    revalidatePath('/');
    revalidatePath(`/mangas/${id}`);
    redirect('/');
}

/**
 * Ação para atualizar um mangá existente.
 */
export async function updateManga(id: string, formData: FormData) {
    const formValues = Object.fromEntries(formData.entries());
    const validatedFields = MangaSchema.safeParse(formValues);

    if (!validatedFields.success) {
        return { error: 'Dados inválidos.' };
    }

    try {
        await prisma.manga.update({
            where: { id },
            data: validatedFields.data,
        });
    } catch (error) {
        return { error: 'Não foi possível atualizar o mangá.' };
    }

    revalidatePath('/');
    revalidatePath(`/mangas/${id}`);
    redirect(`/mangas/${id}`);
}

/**
 * Ação para buscar as estatísticas do Dashboard.
 */
export async function getDashboardStats() {
    try {
        const [totalMangas, lendo, lidos, paginasLidasData] = await prisma.$transaction([
            prisma.manga.count(),
            prisma.manga.count({ where: { status: 'LENDO' } }),
            prisma.manga.count({ where: { status: 'LIDO' } }),
            prisma.manga.aggregate({
                _sum: {
                    pages: true,
                },
                where: {
                    status: 'LIDO',
                },
            }),
        ]);

        const paginasLidas = paginasLidasData._sum.pages || 0;
        return { totalMangas, lendo, lidos, paginasLidas };
    } catch (error) {
        console.error("Falha ao buscar estatísticas do dashboard:", error);
        return { totalMangas: 0, lendo: 0, lidos: 0, paginasLidas: 0 };
    }
}