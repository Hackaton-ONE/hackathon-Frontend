"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { DashboardStats } from "@/components/dashboard/Stats";
import { TemporalTrend } from "@/components/dashboard/TemporalTrend";
import { TopKeywords } from "@/components/dashboard/TopKeywords";
import { RecentHistory } from "@/components/dashboard/RecentHistory";


export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  // Proteção de Rota
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

  }, [status, router]);

  if (status === "loading") {

    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Carregando...</div>;

  }

  if (status === "unauthenticated") return null;
  return (

    <main className="relative min-h-screen bg-[#0F172A] overflow-x-hidden">

      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

      <div className="relative z-10">

        <Navbar />

        <div className="max-w-[104rem] mx-auto px-4 lg:px-8 pt-10 pb-16">

          <div className="mb-10">

             <h1 className="text-3xl font-inter font-bold text-white mb-2">Visão Geral</h1>
             <p className="text-blue-light font-poppins text-md">Acompanhe a análise de sentimentos em tempo real.</p>

          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            <div className="lg:col-span-2">

              <TemporalTrend />

            </div>

            <div className="lg:col-span-1">

              <TopKeywords />

            </div>

          </div>

          <RecentHistory />

        </div>
      </div>
    </main>
  )
}