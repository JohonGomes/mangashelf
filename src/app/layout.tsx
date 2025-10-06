// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider"; // 1. Importe o ThemeProvider

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
    <html lang="pt-BR" suppressHydrationWarning> {/* Adicione suppressHydrationWarning */}
      <body>
        {/* 2. Envolva a aplicação com o ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}