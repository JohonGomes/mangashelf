// src/components/Header.tsx
"use client"

import Link from "next/link"; // <-- ESTA É A LINHA QUE FALTAVA
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-logo tracking-tighter">
          MangaShelf
        </Link>

        {/* Navegação para Desktop */}
        <nav className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/home">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/estante">Minha Estante</Link>
          </Button>
          <Button asChild>
            <Link href="/mangas/new">Adicionar Mangá</Link>
          </Button>
          <ThemeToggle />
        </nav>

        {/* Navegação para Mobile */}
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
                <SheetClose asChild>
                  <Link href="/home" className="font-bold">Dashboard</Link>
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