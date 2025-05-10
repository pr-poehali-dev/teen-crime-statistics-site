
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  icon?: string;
  className?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  description,
  change,
  icon,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "animate-fade-in overflow-hidden", 
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <Icon name={icon} className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
      {change && (
        <CardFooter className="p-2">
          <div
            className={cn(
              "flex items-center text-xs",
              change.type === "increase" 
                ? "text-emerald-500" 
                : change.type === "decrease" 
                ? "text-red-500" 
                : "text-muted-foreground"
            )}
          >
            <Icon
              name={
                change.type === "increase"
                  ? "TrendingUp"
                  : change.type === "decrease"
                  ? "TrendingDown"
                  : "Minus"
              }
              className="mr-1 h-3 w-3"
            />
            <span>
              {change.value}% по сравнению с прошлым годом
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
