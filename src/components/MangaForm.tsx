// src/components/MangaForm.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Genre, Manga, ReadingStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface MangaFormProps {
    initialData?: Manga;
    // A ação agora é mais específica sobre o que retorna
    formAction: (formData: FormData) => Promise<{ success: boolean; message: string; mangaId?: string }>;
}

export function MangaForm({ initialData, formAction }: MangaFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await formAction(formData);
            if (result.success) {
                toast.success(result.message);
                // Redirecionamos do lado do cliente após o sucesso
                if (initialData) { // Se estávamos a editar, voltamos para a página de detalhes
                    router.push(`/mangas/${result.mangaId}`);
                } else { // Se estávamos a criar, vamos para a estante
                    router.push('/estante');
                }
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        // Agora o formulário chama a nossa função 'handleSubmit'
        <form action={handleSubmit} className="space-y-6">
            {/* ... O resto do formulário (todos os Inputs, Selects, etc.) continua exatamente igual ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Título *</label>
                    <Input name="title" id="title" required defaultValue={initialData?.title} />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">Autor *</label>
                    <Input name="author" id="author" required defaultValue={initialData?.author} />
                </div>
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium mb-1">Gênero *</label>
                    <Select name="genre" required defaultValue={initialData?.genre}>
                        <SelectTrigger><SelectValue placeholder="Selecione um gênero" /></SelectTrigger>
                        <SelectContent>
                            {Object.values(Genre).map((genre) => (
                                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">Status *</label>
                    <Select name="status" required defaultValue={initialData?.status}>
                        <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                        <SelectContent>
                            {Object.values(ReadingStatus).map((status) => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium mb-1">Ano</label>
                        <Input name="year" id="year" type="number" defaultValue={initialData?.year ?? ''} />
                    </div>
                    <div>
                        <label htmlFor="pages" className="block text-sm font-medium mb-1">Páginas</label>
                        <Input name="pages" id="pages" type="number" defaultValue={initialData?.pages ?? ''} />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium mb-1">Nota (1-5)</label>
                        <Input name="rating" id="rating" type="number" min="1" max="5" defaultValue={initialData?.rating ?? ''} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="cover" className="block text-sm font-medium mb-1">URL da Capa</label>
                    <Input name="cover" id="cover" type="url" placeholder="https://exemplo.com/capa.jpg" defaultValue={initialData?.cover ?? ''} />
                </div>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="synopsis" className="block text-sm font-medium mb-1">Sinopse</label>
                <Textarea name="synopsis" id="synopsis" rows={4} defaultValue={initialData?.synopsis ?? ''} />
            </div>

            {/* O botão agora mostra um estado de carregamento! */}
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Adicionar Mangá')}
            </Button>
        </form>
    );
}