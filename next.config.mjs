import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  // Use one of Shiki's packaged themes
  theme: 'one-dark-pro',
  // Or your own JSON theme
  // theme: JSON.parse(
  //   fs.readFileSync(require.resolve('./themes/dark.json'), 'utf-8')
  // ),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push('line--highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REPO_URL: "https://github.com/wahid-ari/next-mdx"
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [remarkGfm, remarkPrism],
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);