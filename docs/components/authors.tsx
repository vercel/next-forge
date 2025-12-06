import Image from "next/image";

type Author = {
  company: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
};

export const Authors = ({ data }: { data: Author[] }) => (
  <div className="not-prose mb-12 flex flex-col gap-2">
    <span className="text-muted-foreground text-sm">Co-authored by</span>
    <div className="flex flex-wrap items-center gap-2">
      {data.map((author) => (
        <div
          className="relative inline-flex items-center gap-3 rounded-xl border bg-secondary p-2 pr-4 font-normal"
          key={author.user.id}
        >
          <div className="relative">
            <div className="h-8 w-8 overflow-hidden rounded-full border">
              <Image
                alt=""
                className="m-0 h-full w-full object-cover"
                height={32}
                src={`/images/authors/${author.company.id}/${author.user.id}.jpg`}
                width={32}
              />
            </div>
            <div className="-bottom-1 -right-1 absolute h-4 w-4 overflow-hidden rounded-full border object-cover">
              <Image
                alt=""
                className="m-0 h-full w-full object-cover"
                height={16}
                src={`/images/authors/${author.company.id}/logo.jpg`}
                width={16}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] leading-tight">
              {author.user.name}
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              {author.company.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
