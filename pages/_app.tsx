import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}
