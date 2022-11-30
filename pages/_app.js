import "@styles/globals.css";
import "@styles/prism-atom-dark.css";
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { useRouter } from "next/router";
import MdxLayout from "@components/MdxLayout";

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isDocs = router.asPath.startsWith("/docs")
  return (
    <ThemeProvider attribute="class" storageKey='theme'>
      <main className={inter.className}>
        {isDocs ?
          <MdxLayout>
            <Component {...pageProps} />
          </MdxLayout>
          :
          <Component {...pageProps} />
        }
      </main>
    </ThemeProvider>
  )
}

export default MyApp