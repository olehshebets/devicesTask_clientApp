import type { AppProps } from "next/app";

import Layout from "@/components/common/layout";

import "../../public/style.css";
import "@/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
