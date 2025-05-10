
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface CrimeChartProps {
  className?: string;
}

const CrimeChart = ({ className }: CrimeChartProps) => {
  const [timeRange, setTimeRange] = useState<"year" | "6months" | "3months">("year");

  // Имитационные данные для графика
  const yearData = [
    { month: "Январь", count: 1140 },
    { month: "Февраль", count: 1220 },
    { month: "Март", count: 1310 },
    { month: "Апрель", count: 1350 },
    { month: "Май", count: 1420 },
    { month: "Июнь", count: 1390 },
    { month: "Июль", count: 1280 },
    { month: "Август", count: 1210 },
    { month: "Сентябрь", count: 1150 },
    { month: "Октябрь", count: 1080 },
    { month: "Ноябрь", count: 980 },
    { month: "Декабрь", count: 850 },
  ];

  // Выбор данных в зависимости от выбранного периода
  const chartData = timeRange === "year" 
    ? yearData 
    : timeRange === "6months" 
      ? yearData.slice(6) 
      : yearData.slice(9);

  // Определение максимального значения для графика
  const maxCount = Math.max(...chartData.map(item => item.count));

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Динамика правонарушений</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant={timeRange === "year" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("year")}
          >
            Год
          </Button>
          <Button 
            variant={timeRange === "6months" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("6months")}
          >
            6 месяцев
          </Button>
          <Button 
            variant={timeRange === "3months" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("3months")}
          >
            3 месяца
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="линейный" className="space-y-4">
          <TabsList>
            <TabsTrigger value="линейный">Линейный</TabsTrigger>
            <TabsTrigger value="столбчатый">Столбчатый</TabsTrigger>
          </TabsList>

          <TabsContent value="линейный" className="pt-2">
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full flex-col">
                {/* Ось Y с значениями */}
                <div className="flex h-full">
                  <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                    <span>{maxCount}</span>
                    <span>{Math.floor(maxCount * 0.75)}</span>
                    <span>{Math.floor(maxCount * 0.5)}</span>
                    <span>{Math.floor(maxCount * 0.25)}</span>
                    <span>0</span>
                  </div>
                  
                  {/* График */}
                  <div className="relative flex-1">
                    {/* Горизонтальные линии сетки */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                    </div>
                    
                    {/* Линия графика */}
                    <svg className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Область под линией */}
                      <path
                        d={`
                          M 0 ${300 - (chartData[0].count / maxCount) * 300}
                          ${chartData.map((item, index) => {
                            const x = (index / (chartData.length - 1)) * 100 + "%";
                            const y = 300 - (item.count / maxCount) * 300;
                            return `L ${x} ${y}`;
                          }).join(" ")}
                          L 100% 300
                          L 0 300
                          Z
                        `}
                        fill="url(#line-gradient)"
                        className="opacity-50"
                      />
                      
                      {/* Линия графика */}
                      <path
                        d={`
                          M 0 ${300 - (chartData[0].count / maxCount) * 300}
                          ${chartData.map((item, index) => {
                            const x = (index / (chartData.length - 1)) * 100 + "%";
                            const y = 300 - (item.count / maxCount) * 300;
                            return `L ${x} ${y}`;
                          }).join(" ")}
                        `}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        className="opacity-90"
                      />
                      
                      {/* Точки на линии */}
                      {chartData.map((item, index) => {
                        const x = (index / (chartData.length - 1)) * 100 + "%";
                        const y = 300 - (item.count / maxCount) * 300;
                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="white"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
                
                {/* Ось X с метками */}
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  {chartData.map((item, index) => (
                    <div key={index} className={cn(
                      "text-center",
                      // Показываем каждый второй месяц для годового обзора
                      timeRange === "year" && index % 2 !== 0 ? "invisible sm:visible" : ""
                    )}>
                      {item.month.slice(0, 3)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="столбчатый" className="pt-2">
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full flex-col">
                {/* Ось Y с значениями */}
                <div className="flex h-full">
                  <div className="flex flex-col justify-between text-xs text-muted-foreground pr-2">
                    <span>{maxCount}</span>
                    <span>{Math.floor(maxCount * 0.75)}</span>
                    <span>{Math.floor(maxCount * 0.5)}</span>
                    <span>{Math.floor(maxCount * 0.25)}</span>
                    <span>0</span>
                  </div>
                  
                  {/* График */}
                  <div className="relative flex-1">
                    {/* Горизонтальные линии сетки */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                      <div className="border-t border-border opacity-20 h-0" />
                    </div>
                    
                    {/* Столбцы графика */}
                    <div className="absolute inset-0 flex items-end justify-between">
                      {chartData.map((item, index) => {
                        const height = (item.count / maxCount) * 100 + "%";
                        return (
                          <div
                            key={index}
                            className="group flex flex-col items-center"
                            style={{ width: `${100 / chartData.length}%` }}
                          >
                            <div 
                              className="w-4/5 rounded-sm bg-primary hover:bg-primary/90 transition-all relative"
                              style={{ height }}
                            >
                              {/* Всплывающая подсказка */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                                {item.count} случаев
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Ось X с метками */}
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  {chartData.map((item, index) => (
                    <div key={index} className={cn(
                      "text-center",
                      // Показываем каждый второй месяц для годового обзора
                      timeRange === "year" && index % 2 !== 0 ? "invisible sm:visible" : ""
                    )}>
                      {item.month.slice(0, 3)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Информация о тенденциях */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4">
          <div className="flex items-start space-x-2">
            <div className="p-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <Icon name="TrendingDown" className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Снижение на 7.2%</h4>
              <p className="text-xs text-muted-foreground">По сравнению с 2023 годом</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="p-1.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
              <Icon name="Calendar" className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Сезонный пик</h4>
              <p className="text-xs text-muted-foreground">Май-июнь (период каникул)</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="p-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
              <Icon name="AlertTriangle" className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Целевой показатель</h4>
              <p className="text-xs text-muted-foreground">Снижение на 10% к 2026</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrimeChart;
</script>
</current-code>

<pp-write filepath="src/pages/Dashboard.tsx" partial>
import { useState } from "react";
import StatCard from "@/components/StatCard";
import CrimeChart from "@/components/CrimeChart";
import AgeDistribution from "@/components/AgeDistribution";
import RegionMap from "@/components/RegionMap";
import CrimeCategories from "@/components/CrimeCategories";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

// ... keep existing code below
