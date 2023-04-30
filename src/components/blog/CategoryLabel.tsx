import Link from "next/link";
import Label from "~/components/ui/label";
import type { Category } from "@prisma/client";

export default function CategoryLabel({
  categories,
  nomargin = false,
}: {
  categories: Category[];
  nomargin?: boolean;
}) {
  return (
    <div className="flex gap-3">
      {/* {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href={`/category/${category.slug}`} key={index}>
            <Label nomargin={nomargin} color={category.color}>
              {category.title}
            </Label>
          </Link>
        ))} */}
    </div>
  );
}
