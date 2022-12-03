import Head from 'next/head';
import Navbar from '@components/Navbar';
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import Image from 'next/image';
import Badge from "@components/Badge";

const options = {
  theme: 'one-dark-pro',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('line--highlighted');
  }
};

export async function getStaticProps({ params }) {
  const slug = params.slug
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, options],
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
  const files = fs.readdirSync(path.join('posts'))
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

export default function Post({ frontMatter: { title, date, description, thumbnailUrl }, mdxSource }) {
  return (
    <>
      <Head>
        <title>{title} | Next MDX</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div id="scroll-margin-top">
        <article className="dark:bg-[#111] min-h-screen py-8">
          <h1 className="text-center pt-10 text-4xl dark:text-white font-bold mb-4">{title}</h1>
          <p className="text-center text-neutral-700 dark:text-neutral-200">{description}</p>
          <p className="text-center text-neutral-500 dark:text-neutral-400">{date}</p>
          <Image
            src={thumbnailUrl}
            className="rounded-lg my-10 mx-auto"
            alt="thumbnail"
            width={600}
            height={400}
            objectFit="cover"
          />
          <div className="mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:rounded-xl prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert transition-all duration-200
          prose-h1:mt-8 prose-h2:my-0 prose-h2:pt-6 prose-h2:pb-4 prose-h3:mt-4 prose-h4:mt-2
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-[#1d1d1d] prose-code:bg-[#f0f0f0]
          prose-pre:rounded-lg prose-pre:m-0 prose-pre:p-2 dark:prose-pre:bg-[#1d1d1d] prose-pre:bg-[#1d1d1d] prose-pre:border prose-pre:border-neutral-800
          md:prose-table:w-auto prose-table:border-collapse
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-neutral-900">
            <MDXRemote {...mdxSource} components={{ Badge, Image }} />
          </div>
        </article>
      </div>
    </>
  )
}