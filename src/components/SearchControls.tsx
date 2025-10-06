// src/components/SearchControls.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Genre } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchControls() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleFilterByGenre = (genre: string) => {
        const params = new URLSearchParams(searchParams);
        if (genre && genre !== 'TODOS') {
            params.set('genre', genre);
        } else {
            params.delete('genre');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
                type="search"
                placeholder="Buscar por título ou autor..."
                className="md:w-1/2"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
            <Select onValueChange={handleFilterByGenre} defaultValue={searchParams.get('genre') || 'TODOS'}>
                <SelectTrigger className="md:w-[280px]">
                    <SelectValue placeholder="Filtrar por gênero" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="TODOS">Todos os Gêneros</SelectItem>
                    {Object.values(Genre).map((genre) => (
                        <SelectItem key={genre} value={genre}>
                            {genre}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}