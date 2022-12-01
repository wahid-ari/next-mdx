import Navbar from "./Navbar";

export default function MdxLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:rounded-xl prose-a:text-sky-500 dark:prose-invert 
          prose-h1:mt-8 prose-h2:mt-8 prose-h3:mt-4 prose-h4:mt-2
          prose-code:px-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-neutral-800 prose-code:bg-neutral-200/80
          md:prose-table:w-auto prose-table:border-collapse    
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-[#191919]
          prose-pre:w-auto
      ">
        <div className="">{children}</div>
      </div>
    </>
  );
}