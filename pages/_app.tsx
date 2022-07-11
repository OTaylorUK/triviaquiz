import '../styles/globals.css'
import Link from 'next/link'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'
import { ThemeProvider } from '../store/theme'; 
import type { AppProps } from 'next/app'
import { useAnalyticsInstance } from "../hooks/useAnalytics";
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {

  useAnalyticsInstance();

  return (
    <ThemeProvider>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>
              {children}
            </a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>

    </ThemeProvider>

  )
}

export default MyApp
