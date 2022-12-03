import "@styles/globals.css";
import "@styles/syntax-highlighting.css";
import { Inter } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { useRouter } from "next/router";
import MdxLayout from "@components/MdxLayout";
import FeaturesLayout from "@components/FeaturesLayout";

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isDocs = router.asPath.startsWith("/docs")
  const isFeatures = router.asPath.startsWith("/features")
  return (
    <ThemeProvider attribute="class" storageKey='theme'>
      <main className={inter.className}>
        {isDocs ? (
          <MdxLayout>
            <Component {...pageProps} />
          </MdxLayout>
        ) : isFeatures ? (
          <FeaturesLayout>
            <Component {...pageProps} />
          </FeaturesLayout>
        ) :
          <Component {...pageProps} />
        }
      </main>
    </ThemeProvider>
  )
}

export default MyApp