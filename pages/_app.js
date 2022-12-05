import "../styles/globals.css";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { useState } from "react";
import store from "../store/store";
import Head from "next/head";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionContextProvider>
  );
}

export default MyApp;

// function MyApp({ Component, pageProps }) {
// return <Component {...pageProps} />
// }
