import Head from 'next/head';
import Navbar from '@components/Navbar';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })
  return {
    props: {
      posts
    }
  }
}

export default function Posts({ posts }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <>
      <Head>
        <title>Posts | Next MDX</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="dark:bg-[#111]">
        <div className="mx-auto max-w-5xl min-h-screen px-2 pb-16">
          <h1 className="text-center py-16 text-4xl dark:text-white font-bold">Posts</h1>
          <div className="mx-auto relative w-full mb-4">
            <input
              aria-label="Search posts"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts"
              className="block w-full px-4 py-2 text-gray-900 bg-white border rounded-md dark:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#1d1d1d] dark:text-gray-100"
            />
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" />
          </div>
          <div className="mx-auto py-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchValue ?
              filteredPosts.map((post, index) => (
                <Link href={'/posts/' + post.slug} passHref key={index}>
                  <div className="h-full border dark:border-neutral-700 rounded-lg group">
                    <div className="m-auto">
                      <Image
                        src={post.frontMatter.thumbnailUrl}
                        className="rounded-lg"
                        alt="thumbnail"
                        width={600}
                        height={400}
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xl font-medium dark:text-white group-hover:text-sky-600 transition-all">{post.frontMatter.title}</h5>
                      <p className="text-neutral-700 dark:text-neutral-200 my-2">{post.frontMatter.description}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.frontMatter.date}</p>
                    </div>
                  </div>
                </Link>
              ))
              :
              posts.map((post, index) => (
                <Link href={'/posts/' + post.slug} passHref key={index}>
                  <div className="h-full border dark:border-neutral-700 rounded-lg group hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200">
                    <div className="m-auto">
                      <Image
                        src={post.frontMatter.thumbnailUrl}
                        className="rounded-lg"
                        alt="thumbnail"
                        width={600}
                        height={400}
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xl font-medium dark:text-white group-hover:text-sky-600 transition-all duration-200">{post.frontMatter.title}</h5>
                      <p className="text-neutral-700 dark:text-neutral-200 my-2">{post.frontMatter.description}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.frontMatter.date}</p>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}