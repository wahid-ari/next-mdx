import Navbar from "./Navbar";

export default function FeaturesLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="dark:bg-[#111] min-h-screen py-8">
        <div className="mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:m-0 prose-a:text-sky-500 dark:prose-invert
          prose-h1:mt-8 prose-h2:mt-8 prose-h3:mt-4
          prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-[#1d1d1d] prose-code:bg-[#f3f3f3]
          prose-pre:rounded-lg dark:prose-pre:bg-[#111] prose-pre:bg-[#fff] prose-pre:border dark:prose-pre:border-neutral-700
      ">
          <div className="">{children}</div>
        </div>
      </div>
    </>
  );
}