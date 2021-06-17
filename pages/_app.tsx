import { AppProps } from 'next/app';
import dynamic from "next/dynamic";
import '../styles/globals.scss'
import { Layout } from "../components";

function App({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App
