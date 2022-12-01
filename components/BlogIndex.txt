import { getPagesUnderRoute } from "nextra/context";
import Link from "next/link";
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function BlogIndex({ more = "Read more" }) {
  const length = getPagesUnderRoute("/blog").length
  return getPagesUnderRoute("/blog").map((page, index) => {
    // Alias `<a>` to avoid it being replaced by MDX components.
    const A = "a";
    return (
      <div key={index + 1} className="">
        <h3>
          <Link href={page.route}>
            <A className="text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 transition-all no-underline">
              {page.meta?.title || page.frontMatter?.title || page.name}
            </A>
          </Link>
        </h3>
        <p className="opacity-80 !mt-0 pt-3">
          {page.frontMatter?.description}{" "}
          <Link href={page.route}>
            <A className="text-blue-500 hover:text-blue-600 transition-all">
              {more + " ➔"}
            </A>
          </Link>
        </p>
        {page.frontMatter?.date ? (
          <p className="text-gray-500 text-sm !mt-0 pt-2.5 flex items-center gap-1">
            <CalendarDaysIcon className="h-5 w-5" />
            {page.frontMatter.date}
          </p>
        ) : null}
        {index + 1 < length && <hr className="border-t dark:border-neutral-800" />}
      </div>
    );
  });
}