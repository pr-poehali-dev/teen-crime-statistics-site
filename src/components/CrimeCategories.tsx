
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CrimeCategoriesProps {
  className?: string;
}

const CrimeCategories = ({ className }: CrimeCategoriesProps) => {
  // Имитационные данные по категориям преступлений
  const crimeTypes = [
    { type: "Кражи", percentage: 38.2, count: 5494, color: "bg-blue-500" },
    { type: "Хулиганство", percentage: 21.4, count: 3078, color: "bg-green-500" },
    { type: "Вандализм", percentage: 12.6, count: 1812, color: "bg-amber-500" },
    { type: "Распространение наркотиков", percentage: 8.3, count: 1194, color: "bg-red-500" },
    { type: "Мошенничество", percentage: 7.8, count: 1122, color: "bg-indigo-500" },
    { type: "Насильственные действия", percentage: 6.4, count: 920, color: "bg-purple-500" },
    { type: "Другие преступления", percentage: 5.3, count: 762, color: "bg-gray-500" },
  ];

  // Дополнительные данные по группам
  const soloData = { percentage: 62, count: 8917 };
  const groupData = { percentage: 38, count: 5465 };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Виды правонарушений</span>
          <div className="text-sm font-normal text-muted-foreground flex items-center">
            <Icon name="FileBarChart2" className="h-4 w-4 mr-1" />
            2024 год
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="types">
          <TabsList className="mb-4">
            <TabsTrigger value="types">Категории</TabsTrigger>
            <TabsTrigger value="groups">Групповые / одиночные</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types" className="space-y-4">
            <div className="aspect-square max-w-[250px] mx-auto relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">14,382</div>
                  <div className="text-xs text-muted-foreground">всего случаев</div>
                </div>
              </div>
              
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {crimeTypes.map((item, index) => {
                  // Расчет для построения кольцевой диаграммы
                  const prevPercentageSum = crimeTypes
                    .slice(0, index)
                    .reduce((sum, current) => sum + current.percentage, 0);
                  
                  const offset = prevPercentageSum * 3.6; // 3.6 = 360 / 100
                  const length = item.percentage * 3.6;
                  
                  // Расчет координат для создания дуги
                  const r = 40; // радиус
                  const cx = 50; // центр x
                  const cy = 50; // центр y
                  
                  return (
                    <circle
                      key={index}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="transparent"
                      stroke={item.color.replace('bg-', 'var(--')}
                      strokeWidth="20"
                      strokeDasharray={`${length} ${360 - length}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                      style={{ 
                        opacity: 0,
                        animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.2}s forwards` 
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            
            <div className="space-y-2 mt-4">
              {crimeTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn("h-3 w-3 rounded-full mr-2", item.color)} />
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.percentage}%</span>
                    <span className="text-xs text-muted-foreground">({item.count.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full flex items-center justify-center space-x-4">
                <div className="text-center space-y-2 w-1/2">
                  <div className="mx-auto w-24 h-24 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground animate-scale-in">
                    {soloData.percentage}%
                  </div>
                  <h4 className="font-medium">Одиночные</h4>
                  <p className="text-sm text-muted-foreground">{soloData.count.toLocaleString()} случаев</p>
                </div>
                
                <div className="text-center space-y-2 w-1/2">
                  <div className="mx-auto w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-secondary-foreground animate-scale-in" style={{ animationDelay: "0.2s" }}>
                    {groupData.percentage}%
                  </div>
                  <h4 className="font-medium">Групповые</h4>
                  <p className="text-sm text-muted-foreground">{groupData.count.toLocaleString()} случаев</p>
                </div>
              </div>
              
              <div className="w-full border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Особенности групповых правонарушений</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Icon name="Users" className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    Средний размер группы: 3.2 человека
                  </li>
                  <li className="flex items-start">
                    <Icon name="Percent" className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    72% групповых правонарушений совершены лицами одного возраста
                  </li>
                  <li className="flex items-start">
                    <Icon name="TrendingDown" className="h-4 w-4 mr-2 text-green-400 shrink-0 mt-0.5" />
                    Доля групповых правонарушений снизилась на 3.4% с 2023 года
                  </li>
                  <li className="flex items-start">
                    <Icon name="AlertCircle" className="h-4 w-4 mr-2 text-amber-400 shrink-0 mt-0.5" />
                    Групповые правонарушения чаще связаны с вандализмом (28%) и хулиганством (34%)
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default CrimeCategories;
