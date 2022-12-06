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
import Badge from "@components/Badge";

function getHeadings(source) {
  // https://pastebin.com/J454rg8f
  // https://twitter.com/joshwcomeau/status/1334649414812659715
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source
    .split('\n')
    .filter((line) => {
      return line.match(/^###*\s/);
    })
  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === '###' ? 3 : 2;

    return { text, level };
  });
  return headingLines;
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8')
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
      mdxSource,
      content
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

export default function Post({ frontMatter: { title, date, description, thumbnailUrl, toc }, mdxSource, content }) {
  const headings = getHeadings(content)
  const showToc = toc !== false && headings.length > 0
  const titleFix = `${title} | Next MDX`

  return (
    <>
      <Head>
        <title>{titleFix}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

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
        <div className="mx-auto max-w-5xl flex flex-col-reverse lg:flex-row gap-8 pt-8">
          <div className={`${showToc ? "lg:w-3/4" : "w-full"} mx-auto max-w-5xl px-2 min-h-screen 
          prose prose-img:rounded-xl prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert transition-all duration-200
          prose-h1:mt-8 prose-h2:my-0 prose-h2:pt-6 prose-h2:pb-4 prose-h3:mt-4 prose-h4:mt-2
          prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:hidden prose-code:after:hidden dark:prose-code:bg-[#1d1d1d] prose-code:bg-[#f3f3f3]
          prose-pre:rounded-lg dark:prose-pre:bg-[#111] prose-pre:bg-[#fff] prose-pre:border dark:prose-pre:border-neutral-700
          md:prose-table:w-auto prose-table:border-collapse
          prose-th:p-2 prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-700
          prose-td:p-2 prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-700
          even:prose-tr:bg-neutral-100 dark:even:prose-tr:bg-neutral-900`}>
            <MDXRemote {...mdxSource} components={{ Badge, Image }} />
          </div>

          {showToc ?
            <div className="w-full lg:w-1/4 mx-auto max-w-5xl px-2 lg:sticky lg:top-20 lg:self-start">
              <h3 className="text-[22px] font-medium mt-2 mb-4">Table of Content</h3>
              <ul className="space-y-2">
                {headings.map((heading, index) => (
                  <li key={index +1}>
                    <a
                      href={`#${heading.text.toLowerCase().replace(" ", "-")}`}
                      className="text-[15.5px] font-medium text-sky-500 hover:text-sky-600 transition-all duration-200"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            : null
          }
        </div>
      </article>
    </>
  )
}