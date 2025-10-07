import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

export const Search = () => (
  <form action="/search" className="flex items-center gap-2 px-4">
    <div className="relative">
      <div className="absolute top-px bottom-px left-px flex h-8 w-8 items-center justify-center">
        <SearchIcon className="text-muted-foreground" size={16} />
      </div>
      <Input
        className="h-auto bg-background py-1.5 pr-3 pl-8 text-xs"
        name="q"
        placeholder="Search"
        type="text"
      />
      <Button
        className="absolute top-px right-px bottom-px h-8 w-8"
        size="icon"
        variant="ghost"
      >
        <ArrowRightIcon className="text-muted-foreground" size={16} />
      </Button>
    </div>
  </form>
);
