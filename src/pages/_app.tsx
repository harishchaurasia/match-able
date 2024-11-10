// pages/_app.tsx
import "../styles/index.css";
import Navbar from "src/components/Navbar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="p-2"> */}
      {/* </div> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
