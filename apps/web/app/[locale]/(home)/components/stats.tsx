import type { Dictionary } from "@repo/internationalization";
import { MoveDownLeft, MoveUpRight } from "lucide-react";

type StatsProps = {
  dictionary: Dictionary;
};

export const Stats = ({ dictionary }: StatsProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-left font-regular text-xl tracking-tighter md:text-5xl lg:max-w-xl">
              {dictionary.web.home.stats.title}
            </h2>
            <p className="text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-sm">
              {dictionary.web.home.stats.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2 lg:grid-cols-2">
            {dictionary.web.home.stats.items.map((item, index) => (
              <div
                className="flex flex-col justify-between gap-0 rounded-md border p-6"
                key={index}
              >
                {Number.parseFloat(item.delta) > 0 ? (
                  <MoveUpRight className="mb-10 h-4 w-4 text-primary" />
                ) : (
                  <MoveDownLeft className="mb-10 h-4 w-4 text-destructive" />
                )}
                <h2 className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                  {item.type === "currency" && "$"}
                  {new Intl.NumberFormat().format(
                    Number.parseFloat(item.metric)
                  )}
                  <span className="text-muted-foreground text-sm tracking-normal">
                    {Number.parseFloat(item.delta) > 0 ? "+" : ""}
                    {item.delta}%
                  </span>
                </h2>
                <p className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
