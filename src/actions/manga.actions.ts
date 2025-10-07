// src/actions/manga.actions.ts
'use server';

import { prisma } from '@/lib/prisma';
// CORREÇÃO: Importamos 'Genre' para usar como tipo e 'Prisma' para a cláusula 'where'
import { Prisma, Genre } from '@prisma/client';
import { revalidatePath } from 'next/cache';
// CORREÇÃO: Removemos o import do 'redirect', pois não é mais usado aqui
// import { redirect } from 'next/navigation';
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


export async function getFilteredMangas(params: { query?: string; genre?: string }) {
  const { query, genre } = params;

  const where: Prisma.MangaWhereInput = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { author: { contains: query, mode: 'insensitive' } },
    ];
  }

  // CORREÇÃO PRINCIPAL: Substituímos 'as any' por 'as Genre' para sermos específicos no tipo
  if (genre && genre !== 'TODOS') {
    where.genre = genre as Genre;
  }

  try {
    const mangas = await prisma.manga.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return mangas;
  } catch (_error) { // CORREÇÃO: Usamos '_' para indicar que a variável de erro não é usada
    // Não logamos mais o erro para não poluir os logs de produção com erros esperados
    return [];
  }
}

export async function createManga(formData: FormData) {
  const validatedFields = MangaSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: 'Dados inválidos.' };
  }

  try {
    await prisma.manga.create({ data: validatedFields.data });
    revalidatePath('/estante');
    return { success: true, message: 'Mangá criado com sucesso!' };
  } catch (_error) { // CORREÇÃO: Usamos '_'
    return { success: false, message: 'Erro no banco de dados.' };
  }
}

export async function deleteManga(id: string) {
  try {
    await prisma.manga.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/estante');
    return { success: true, message: 'Mangá apagado com sucesso!' };
  } catch (_error) { // CORREÇÃO: Usamos '_'
    return { success: false, message: 'Não foi possível apagar o mangá.' };
  }
}

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
  } catch (_error) { // CORREÇÃO: Usamos '_'
    return { success: false, message: 'Erro no banco de dados.' };
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
  } catch (_error) { // CORREÇÃO: Usamos '_'
    return { totalMangas: 0, lendo: 0, lidos: 0, paginasLidas: 0 };
  }
}