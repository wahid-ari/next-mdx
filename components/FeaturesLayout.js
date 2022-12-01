import Navbar from "./Navbar";

export default function FeaturesLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:m-0 prose-a:text-sky-500 dark:prose-invert
          prose-h1:mt-16
          prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-neutral-800 prose-code:bg-neutral-100
          prose-pre:m-0 prose-pre:p-2 dark:prose-pre:bg-neutral-800 prose-pre:bg-neutral-100
      ">
        <div className="">{children}</div>
      </div>
    </>
  );
}