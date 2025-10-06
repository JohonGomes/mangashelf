// src/components/Header.tsx
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle"; // 1. Importe o ThemeToggle

export function Header() {
    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold">
                    📚 MangaShelf
                </Link>
                <nav className="flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/estante">Minha Estante</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/mangas/new">Adicionar Mangá</Link>
                    </Button>
                    <ThemeToggle /> {/* 2. Adicione o botão aqui */}
                </nav>
            </div>
        </header>
    );
}