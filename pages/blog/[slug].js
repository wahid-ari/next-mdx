import Head from 'next/head';
import Navbar from '@components/Navbar';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import Image from 'next/image';
import Authors, { Author } from "@components/Authors";
import Alert from "@components/Alert";

export async function getStaticProps({ params }) {
  const slug = params.slug
  const markdownWithMeta = fs.readFileSync(path.join('blog', slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypePrism,
        [rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]],
      format: 'mdx'
    },
  })
  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('blog'))
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export default function Post({ frontMatter: { title, description, thumbnailUrl }, mdxSource }) {
  return (
    <>
      <Head>
        <title>{title} | Next MDX</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div id="scroll-margin-top">
        <article className="dark:bg-[#111] mx-auto max-w-5xl min-h-screen py-8">
          <Image
            src={thumbnailUrl}
            className="rounded-lg mt-10 mx-auto"
            alt="thumbnail"
            width={600}
            height={400}
            objectFit="cover"
          />
          <div className="px-2 mx-auto max-w-5xl min-h-screen 
          prose prose-img:rounded-xl prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert transition-all duration-200
          prose-h1:mt-8 prose-h2:my-0 prose-h2:pt-6 prose-h2:pb-4 prose-h3:mt-4 prose-h4:mt-2
          prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-[#1d1d1d] prose-code:bg-[#f3f3f3]
          prose-pre:rounded-lg dark:prose-pre:bg-[#111] prose-pre:bg-[#fff] prose-pre:border dark:prose-pre:border-neutral-700
          md:prose-table:w-auto prose-table:border-collapse
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-neutral-900">
            <MDXRemote {...mdxSource} components={{ Authors, Author, Alert }} />
          </div>
        </article>
      </div>
    </>
  )
}