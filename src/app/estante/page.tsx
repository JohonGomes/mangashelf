// src/app/estante/page.tsx
import { getFilteredMangas } from "@/actions/manga.actions";
import { MangaCard } from "@/components/MangaCard";
import { SearchControls } from "@/components/SearchControls";

interface EstantePageProps {
  searchParams: {
    q?: string;
    genre?: string;
  };
}

export default async function EstantePage({ searchParams }: EstantePageProps) {
  const mangas = await getFilteredMangas({
    query: searchParams.q,
    genre: searchParams.genre,
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <SearchControls />

      {mangas.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Nenhum mangá encontrado.</h2>
          <p className="mt-2 text-muted-foreground">
            Tente ajustar sua busca ou adicione um novo mangá!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      )}
    </div>
  );
}