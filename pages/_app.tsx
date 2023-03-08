import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useToken } from "src/hooks";
import { onMessage } from "firebase/messaging";
import React from "react";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { tokenFCM } = useToken();
  console.log("TOKEN in Here", tokenFCM);
  React.useEffect(() => {
    if (tokenFCM?.messaging) {
      
    }
  }, []);
  return (
    <>
      <SessionProvider session={session}>
        <ToastContainer />
        <NextNProgress />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
