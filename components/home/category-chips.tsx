import { Badge } from "@/components/ui/badge";
import { TCategory } from "@/lib/types";

// type Category = { id: string; name: string };

const CategoryChips = ({ categories }: { categories: TCategory[] }) => {
    return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <Badge
          key={c.name}
          variant="outline"
          className="cursor-pointer px-3 py-1.5 text-sm hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
        >
          {c.name}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryChips;