import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Archivo:300,400,500,600,700&amp;amp;subset=latin-ext"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="/fonts/Linearicons/Font/demo-files/demo.css"
        />

        <link
          rel="stylesheet"
          href="/fonts/font-awesome/css/font-awesome.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <link rel="shortcut icon" href="/img/favi.png" />
        <link rel="icon" href="/img/favi.png" sizes="32x32" />
        <link rel="icon" href="/img/favi.png" sizes="192x192" />
        <link rel="apple-touch-icon-precomposed" href="/img/favi.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
