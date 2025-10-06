// src/app/mangas/new/page.tsx
import { createManga } from "@/actions/manga.actions";
import { MangaForm } from "@/components/MangaForm";

export default function NewMangaPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Adicionar Novo Mangá</h1>
            {/* CORREÇÃO: Agora estamos passando explicitamente a ação 'createManga'
        para o nosso formulário reutilizável.
      */}
            <MangaForm formAction={createManga} />
        </div>
    );
}