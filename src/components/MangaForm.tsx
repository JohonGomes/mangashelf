// src/components/MangaForm.tsx
'use client';

import { createManga } from '@/actions/manga.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Genre, ReadingStatus } from '@prisma/client';

export function MangaForm() {
    return (
        <form action={createManga} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Título *
                    </label>
                    <Input name="title" id="title" required />
                </div>

                {/* Autor */}
                <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                        Autor *
                    </label>
                    <Input name="author" id="author" required />
                </div>

                {/* Gênero */}
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium mb-1">
                        Gênero *
                    </label>
                    <Select name="genre" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um gênero" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Genre).map((genre) => (
                                <SelectItem key={genre} value={genre}>
                                    {genre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Status *
                    </label>
                    <Select name="status" defaultValue="QUERO_LER" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(ReadingStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Ano, Páginas e Nota */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium mb-1">Ano</label>
                        <Input name="year" id="year" type="number" />
                    </div>
                    <div>
                        <label htmlFor="pages" className="block text-sm font-medium mb-1">Páginas</label>
                        <Input name="pages" id="pages" type="number" />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium mb-1">Nota (1-5)</label>
                        <Input name="rating" id="rating" type="number" min="1" max="5" />
                    </div>
                </div>

                {/* URL da Capa */}
                <div>
                    <label htmlFor="cover" className="block text-sm font-medium mb-1">URL da Capa</label>
                    <Input name="cover" id="cover" type="url" placeholder="https://exemplo.com/capa.jpg" />
                </div>
            </div>

            {/* Sinopse */}
            <div>
                <label htmlFor="synopsis" className="block text-sm font-medium mb-1">
                    Sinopse
                </label>
                <Textarea name="synopsis" id="synopsis" rows={4} />
            </div>

            <Button type="submit">Salvar Mangá</Button>
        </form>
    );
}