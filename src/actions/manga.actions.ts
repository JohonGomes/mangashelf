// actions/manga.actions.ts
'use server'; // Magia do Next.js para dizer que isso roda no servidor!

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const prisma = new PrismaClient();

// Esquema de validação com Zod
const MangaSchema = z.object({
    title: z.string().min(1, 'O título é obrigatório.'),
    author: z.string().min(1, 'O autor é obrigatório.'),
    genre: z.enum(['SHOUJO', 'SHONEN', 'ACAO', 'MENINAS_MAGICAS', 'ISEKAI', 'DRAMA', 'ROMANCE', 'COMEDIA']),
    status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']),
    // Campos opcionais podem ser nulos ou strings vazias que converteremos
    year: z.coerce.number().optional(),
    pages: z.coerce.number().optional(),
    rating: z.coerce.number().min(1).max(5).optional(),
    synopsis: z.string().optional(),
    cover: z.string().url('Insira uma URL válida.').optional().or(z.literal('')),
});


export async function createManga(formData: FormData) {
    const validatedFields = MangaSchema.safeParse(Object.fromEntries(formData.entries()));

    // Se a validação falhar, retorne o erro
    if (!validatedFields.success) {
        console.error(validatedFields.error);
        // Futuramente, podemos retornar uma mensagem de erro mais amigável
        return;
    }

    try {
        await prisma.manga.create({
            data: validatedFields.data,
        });
    } catch (error) {
        console.error(error);
        // Futuramente, podemos retornar uma mensagem de erro
        return;
    }

    revalidatePath('/'); // Avisa o Next.js para atualizar a lista de mangás na home (quando a tivermos)
    redirect('/'); // Redireciona o usuário para a página inicial
}

export async function deleteManga(id: string) {
    try {
        await prisma.manga.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Falha ao deletar o mangá:", error);
        // Retornar um objeto de erro pode ser útil
        return { error: 'Não foi possível deletar o mangá.' };
    }

    revalidatePath('/'); // Limpa o cache da página inicial
    redirect('/'); // Redireciona o usuário
}