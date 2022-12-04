import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import rehypePrism from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REPO_URL: "https://github.com/wahid-ari/next-mdx"
  },
  images: {
    domains: [
      "images.unsplash.com", "assets.vercel.com"
    ],
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);