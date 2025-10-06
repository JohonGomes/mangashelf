// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // 1. Importe o Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MangaShelf",
  description: "Sua estante de mangás pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header /> {/* 2. Adicione o Header aqui */}
        <main>{children}</main> {/* 3. O resto da página será renderizado aqui */}
      </body>
    </html>
  );
}