
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RegionMapProps {
  className?: string;
}

const RegionMap = ({ className }: RegionMapProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Имитационные данные по регионам (топ-5 и низшие 5)
  const topRegions = [
    { name: "Москва", count: 1258, rate: 26.4, change: -4.2 },
    { name: "Московская область", count: 945, rate: 22.1, change: -2.8 },
    { name: "Санкт-Петербург", count: 731, rate: 20.9, change: -3.6 },
    { name: "Свердловская область", count: 492, rate: 19.7, change: -1.2 },
    { name: "Краснодарский край", count: 468, rate: 18.3, change: -3.1 },
  ];
  
  const lowestRegions = [
    { name: "Ненецкий АО", count: 12, rate: 4.2, change: -1.3 },
    { name: "Чукотский АО", count: 14, rate: 4.8, change: -0.9 },
    { name: "Магаданская область", count: 24, rate: 5.3, change: -1.5 },
    { name: "Республика Тыва", count: 43, rate: 6.4, change: -1.1 },
    { name: "Камчатский край", count: 52, rate: 7.2, change: -0.7 },
  ];

  // Объединяем данные для поиска
  const allRegions = [...topRegions, ...lowestRegions];
  
  const filteredRegions = searchQuery 
    ? allRegions.filter(region => 
        region.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Региональная статистика</span>
          <div className="text-sm font-normal text-muted-foreground flex items-center">
            <Icon name="MapPin" className="h-4 w-4 mr-1" />
            2024 год
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Icon 
            name="Search" 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Поиск по регионам..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && filteredRegions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-popover shadow-md">
              <ul className="py-1 text-sm">
                {filteredRegions.map((region, index) => (
                  <li 
                    key={index}
                    className="px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                  >
                    <span>{region.name}</span>
                    <span className="text-muted-foreground">{region.count} случаев</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border rounded-md p-4 h-[200px] flex items-center justify-center bg-muted/30">
          <div className="text-center text-muted-foreground">
            <Icon name="Map" className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>Интерактивная карта России с тепловой картой преступности</p>
            <p className="text-xs mt-1">Наведите на регион для подробной информации</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Icon name="ArrowUp" className="h-4 w-4 mr-1 text-red-400" />
              Регионы с наибольшими показателями
            </h4>
            <ul className="space-y-2">
              {topRegions.map((region, index) => (
                <li key={index} className="text-sm flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    <span>{region.name}</span>
                  </div>
                  <div className="font-medium">{region.count}</div>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Icon name="ArrowDown" className="h-4 w-4 mr-1 text-green-400" />
              Регионы с наименьшими показателями
            </h4>
            <ul className="space-y-2">
              {lowestRegions.map((region, index) => (
                <li key={index} className="text-sm flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    <span>{region.name}</span>
                  </div>
                  <div className="font-medium">{region.count}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t mt-4">
          <p className="text-xs text-muted-foreground">Показатели из расчета на 100 000 подростков</p>
          <Button variant="outline" size="sm" className="text-xs">
            <Icon name="Download" className="h-3 w-3 mr-1" />
            Скачать полные данные
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionMap;
