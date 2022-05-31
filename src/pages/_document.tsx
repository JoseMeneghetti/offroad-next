import React from 'react'

import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ) as any
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <meta name="language" content="pt-BR" />
          <title>Roia Shop - Motos e Equipamentos de Trilha</title>
          <meta
            name="description"
            content="Venda de motos de trilha, equipamentos de trilha usados, novos e semi novos."
          />
          <meta name="robots" content="none" />
          <meta name="author" content="JRMPDEV" />
          <meta
            name="keywords"
            content="moto de trilha, trilha, equipamentos de trilha, moto, equipamento, usados, trila, novos"
          />

          <meta property="og:type" content="page" />
          <meta property="og:url" content="https://offroad-next.vercel.app/" />
          <meta
            property="og:title"
            content="Roia Shop - Motos e Equipamentos de Trilha"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/offroad-market.appspot.com/o/ADMIN%2Fimage_processing20200704-17829-1plnmw8.png?alt=media"
          />
          <meta
            property="og:description"
            content="Venda de motos de trilha, equipamentos de trilha usados, novos e semi novos."
          />

          <meta property="article:author" content="jrmp.dev" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@" />
          <meta
            name="twitter:title"
            content="Roia Shop - Motos e Equipamentos de Trilha"
          />
          <meta name="twitter:creator" content="@" />
          <meta
            name="twitter:description"
            content="Venda de motos de trilha, equipamentos de trilha usados, novos e semi novos."
          />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favico/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favico/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favico/favicon-16x16.png"
          />
          <link rel="manifest" href="favico/site.webmanifest" />
          <link
            rel="mask-icon"
            href="favico/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
