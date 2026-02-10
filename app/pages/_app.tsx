import type { AppProps } from "next/app";
import Layout from "@/app/components/Layout";
import "@/app/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
