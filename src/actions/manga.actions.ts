// src/actions/manga.actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

// ... (a função getFilteredMangas continua igual)
export async function getFilteredMangas(params: { query?: string; genre?: string }) {
    const { query, genre } = params;
    const where: Prisma.MangaWhereInput = {};
    if (query) {
        where.OR = [
            { title: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
        ];
    }
    if (genre && genre !== 'TODOS') {
        where.genre = genre as any;
    }
    try {
        const mangas = await prisma.manga.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        return mangas;
    } catch (error) {
        return [];
    }
}


// AÇÃO ATUALIZADA: createManga
export async function createManga(formData: FormData) {
    const validatedFields = MangaSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Dados inválidos.' };
    }

    try {
        await prisma.manga.create({ data: validatedFields.data });
        revalidatePath('/estante');
        return { success: true, message: 'Mangá criado com sucesso!' };
    } catch (error) {
        return { success: false, message: 'Erro no banco de dados.' };
    }
}

// AÇÃO ATUALIZADA: updateManga
export async function updateManga(id: string, formData: FormData) {
    const validatedFields = MangaSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Dados inválidos.' };
    }

    try {
        const updatedManga = await prisma.manga.update({
            where: { id },
            data: validatedFields.data,
        });
        revalidatePath('/estante');
        revalidatePath(`/mangas/${id}`);
        return { success: true, message: 'Mangá atualizado com sucesso!', mangaId: updatedManga.id };
    } catch (error) {
        return { success: false, message: 'Erro no banco de dados.' };
    }
}


// ... (as funções deleteManga e getDashboardStats continuam iguais por enquanto)
export async function deleteManga(id: string) {
    try {
      await prisma.manga.delete({ where: { id } });
      revalidatePath('/');
      revalidatePath('/estante');
      return { success: true, message: 'Mangá apagado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Não foi possível apagar o mangá.' };
    }
  }

export async function getDashboardStats() {
    try {
        const [totalMangas, lendo, lidos, paginasLidasData] = await prisma.$transaction([
            prisma.manga.count(),
            prisma.manga.count({ where: { status: 'LENDO' } }),
            prisma.manga.count({ where: { status: 'LIDO' } }),
            prisma.manga.aggregate({ _sum: { pages: true }, where: { status: 'LIDO' } }),
        ]);
        const paginasLidas = paginasLidasData._sum.pages || 0;
        return { totalMangas, lendo, lidos, paginasLidas };
    } catch (error) {
        return { totalMangas: 0, lendo: 0, lidos: 0, paginasLidas: 0 };
    }
}