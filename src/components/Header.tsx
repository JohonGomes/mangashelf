// src/components/Header.tsx
import Link from "next/link";
import { Button } from "./ui/button"; // Importe o Button

export function Header() {
    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold">
                    📚 MangaShelf
                </Link>
                <nav>
                    {/* Adicione o botão aqui */}
                    <Button asChild>
                        <Link href="/mangas/new">Adicionar Mangá</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}