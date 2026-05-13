import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DashboardDataCard({ title, subTitle, value, className }) {
  return (
    <Card className={cn("rounded-md border-border bg-secondary", className)}>
      <CardContent className="flex flex-col gap-1 p-4">
        <p className="text-sm font-normal text-muted-foreground">{title}</p>
        {subTitle ? <p className="text-sm font-normal text-muted-foreground">{subTitle}</p> : null}
        <div className="mt-2 border-l-[3px] border-transparent pl-2 [border-image:linear-gradient(100deg,#ED5DCD_-2.24%,rgba(95,93,215,0.71)_98.06%)_10]">
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
