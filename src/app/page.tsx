// src/app/page.tsx
import { getDashboardStats } from "@/actions/manga.actions";
import { StatCard } from "@/components/StatCard";
import { Book, BookCheck, BookOpen, NotebookTabs } from "lucide-react";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total de Mangás"
                    value={stats.totalMangas}
                    icon={Book}
                />
                <StatCard
                    title="Lendo Atualmente"
                    value={stats.lendo}
                    icon={BookOpen}
                />
                <StatCard
                    title="Finalizados"
                    value={stats.lidos}
                    icon={BookCheck}
                />
                <StatCard
                    title="Páginas Lidas"
                    value={stats.paginasLidas.toLocaleString('pt-BR')}
                    icon={NotebookTabs}
                />
            </div>
        </div>
    );
}