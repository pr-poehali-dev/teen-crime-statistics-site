
import { useState } from "react";
import StatCard from "@/components/StatCard";
import CrimeChart from "@/components/CrimeChart";
import AgeDistribution from "@/components/AgeDistribution";
import RegionMap from "@/components/RegionMap";
import CrimeCategories from "@/components/CrimeCategories";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const [year, setYear] = useState("2024");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">
              Статистика подростковой преступности
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="FileText" className="mr-2 h-4 w-4" />
              Методология
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Info" className="mr-2 h-4 w-4" />
              О проекте
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Обзор</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Calendar" className="mr-2 h-4 w-4" />
                  {year}
                  <Icon name="ChevronDown" className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" className="mr-2 h-4 w-4" />
                  Скачать отчёт
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Общее количество преступлений"
                value="14,382"
                change={{ value: -7.2, type: "decrease" }}
                icon="FileBarChart"
                delay={0}
              />
              <StatCard
                title="Тяжкие преступления"
                value="2,914"
                change={{ value: -3.8, type: "decrease" }}
                icon="AlertTriangle"
                delay={1}
              />
              <StatCard
                title="Средний возраст"
                value="16.2"
                description="лет"
                change={{ value: 0.3, type: "increase" }}
                icon="Users"
                delay={2}
              />
              <StatCard
                title="Рецидивы"
                value="21.5%"
                change={{ value: -2.1, type: "decrease" }}
                icon="Repeat"
                delay={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <CrimeChart className="animate-slide-up" />
              <AgeDistribution className="animate-slide-up" style={{ animationDelay: "0.1s" }} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <RegionMap className="animate-scale-in" style={{ animationDelay: "0.2s" }} />
              <CrimeCategories className="animate-scale-in" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2025 Статистика подростковой преступности · Все данные основаны на официальной статистике
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Landmark" className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="FileText" className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
