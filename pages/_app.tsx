import '../styles/globals.scss'
import { Layout } from "../components";
import dynamic from "next/dynamic";

function App({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});

// export default App
