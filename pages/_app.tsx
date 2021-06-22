import { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import store from '../lib/redux/store';
import { Layout } from "../components";
import '../styles/globals.scss'

const persistor = persistStore(store)

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App
