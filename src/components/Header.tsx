// src/components/Header.tsx
"use client" // O Sheet precisa ser um Componente de Cliente para gerir o seu estado (aberto/fechado)

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <header className="border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold">
                    📚 MangaShelf
                </Link>

                {/* 1. Navegação para Desktop (visível em ecrãs médios e maiores) */}
                <nav className="hidden items-center space-x-4 md:flex">
                    <Button variant="ghost" asChild>
                        <Link href="/estante">Minha Estante</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/mangas/new">Adicionar Mangá</Link>
                    </Button>
                    <ThemeToggle />
                </nav>

                {/* 2. Navegação para Mobile (visível apenas em ecrãs pequenos) */}
                <div className="flex md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="grid gap-4 py-6">
                                {/* Usamos SheetClose para que o menu se feche ao clicar num link */}
                                <SheetClose asChild>
                                    <Link href="/" className="font-bold">Dashboard</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/estante">Minha Estante</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/mangas/new">Adicionar Mangá</Link>
                                </SheetClose>
                                <div className="pt-4">
                                    <ThemeToggle />
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}