import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes'
import next from "../public/platform/next.png";
import nextLight from "../public/platform/next-light.png";
import vercel from "../public/platform/vercel.png";
import react from "../public/platform/react.png";
import vue from "../public/platform/vue.png";
import nuxt from "../public/platform/nuxt.png";
import svelte from "../public/platform/svelte.png";
import solid from "../public/platform/solid.png";
import angular from "../public/platform/angular.png";

export default function Framework() {
  return (
    <div className="my-4 grid md:grid-cols-3 gap-4">
      <Link href="/docs" className="no-underline">
        <div className="h-full p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <p className="font-semibold text-neutral-900 dark:text-gray-100 text-lg m-0 mb-2">Auth</p>
          <p className="text-neutral-700 dark:text-gray-300 !m-0">User management</p>
        </div>
      </Link>
      <Link href="/libs/sandpack" className="no-underline">
        <div className="h-full p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <p className="font-semibold text-neutral-900 dark:text-gray-100 text-lg m-0 mb-2">Database</p>
          <p className="text-neutral-700 dark:text-gray-300 !m-0">Scalable Postgres database</p>
        </div>
      </Link>
      <Link href="/blog" className="no-underline">
        <div className="h-full p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <p className="font-semibold text-neutral-900 dark:text-gray-100 text-lg m-0 mb-2">Edge Functions</p>
          <p className="text-neutral-700 dark:text-gray-300 !m-0">Server-side functions.</p>
        </div>
      </Link>
    </div>
  )
}

export function Item() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  
  return (
    <div className="my-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      <a className="no-underline" href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8">
            {theme == "dark" ? <Image src={nextLight} alt="Nextjs" /> : <Image src={next} alt="Nextjs" />}
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Next</p>
        </div>
      </a>

      <a className="no-underline" href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={vercel} alt="Vercel" layout="fill" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Vercel</p>
        </div>
      </a>

      <a className="no-underline" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={react} alt="React" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">React</p>
        </div>
      </a>

      <a className="no-underline" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={vue} alt="Vue" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Vue</p>
        </div>
      </a>

      <a className="no-underline" href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={nuxt} alt="Nuxt" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Nuxt</p>
        </div>
      </a>

      <a className="no-underline" href="https://angular.io/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={angular} alt="Angular" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Angular</p>
        </div>
      </a>

      <a className="no-underline" href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={svelte} alt="Svelte" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Svelte</p>
        </div>
      </a>

      <a className="no-underline" href="https://www.solidjs.com/" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 p-4 bg-[#fafafa] dark:bg-neutral-900 rounded-md hover:cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
          <div className="relative h-8 w-8 flex items-center">
            <Image src={solid} alt="Solid" />
          </div>
          <p className="font-medium text-neutral-900 dark:text-gray-100 text-lg m-0">Solid</p>
        </div>
      </a>
    </div>
  )
}