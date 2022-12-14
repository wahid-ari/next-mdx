import Navbar from "./Navbar";

export default function MdxLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="dark:bg-[#111] min-h-screen py-8">
        <div className="mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:rounded-xl prose-a:text-sky-500 dark:prose-invert 
          prose-h1:mt-8 prose-h2:mt-8 prose-h3:mt-4 prose-h4:mt-2
          prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-[#1d1d1d] prose-code:bg-[#f3f3f3]
          prose-pre:rounded-lg dark:prose-pre:bg-[#111] prose-pre:bg-[#fff] prose-pre:border dark:prose-pre:border-neutral-700
          md:prose-table:w-auto prose-table:border-collapse    
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-neutral-900">
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
}