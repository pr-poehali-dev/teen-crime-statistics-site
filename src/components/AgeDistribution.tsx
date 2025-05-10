
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface AgeDistributionProps {
  className?: string;
}

const AgeDistribution = ({ className }: AgeDistributionProps) => {
  // Имитационные данные для диаграммы распределения по возрасту
  const ageData = [
    { age: "14 лет", percentage: 15, count: 2157 },
    { age: "15 лет", percentage: 22, count: 3164 },
    { age: "16 лет", percentage: 32, count: 4602 },
    { age: "17 лет", percentage: 31, count: 4459 },
  ];

  const maxPercentage = Math.max(...ageData.map(item => item.percentage));

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Распределение по возрасту</span>
          <div className="text-sm font-normal text-muted-foreground flex items-center">
            <Icon name="Users" className="h-4 w-4 mr-1" />
            2024 год
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {ageData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={cn(
                      "h-4 w-4 rounded-full mr-2",
                      index === 0 ? "bg-blue-400" :
                      index === 1 ? "bg-green-400" :
                      index === 2 ? "bg-amber-400" :
                      "bg-red-400"
                    )}
                  />
                  <span className="text-sm font-medium">{item.age}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.percentage}%</span>
                  <span className="text-xs text-muted-foreground">({item.count.toLocaleString()})</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    index === 0 ? "bg-blue-400" :
                    index === 1 ? "bg-green-400" :
                    index === 2 ? "bg-amber-400" :
                    "bg-red-400"
                  )}
                  style={{ 
                    width: `${(item.percentage / maxPercentage) * 100}%`,
                    animation: `growWidth 1s ease-out ${index * 0.2}s forwards`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <h4 className="text-sm font-medium mb-2">Ключевые выводы</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <Icon name="ArrowUp" className="h-4 w-4 mr-2 text-red-400 shrink-0 mt-0.5" />
              Наибольшая активность наблюдается в возрасте 16 лет
            </li>
            <li className="flex items-start">
              <Icon name="ArrowDown" className="h-4 w-4 mr-2 text-green-400 shrink-0 mt-0.5" />
              Количество правонарушений в возрасте 14 лет снизилось на 3.1% с 2023 года
            </li>
            <li className="flex items-start">
              <Icon name="AlertCircle" className="h-4 w-4 mr-2 text-amber-400 shrink-0 mt-0.5" />
              Более 60% случаев приходится на старшую возрастную группу (16-17 лет)
            </li>
          </ul>
        </div>

        <style jsx>{`
          @keyframes growWidth {
            from { width: 0; }
            to { width: ${(item.percentage / maxPercentage) * 100}%; }
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default AgeDistribution;
