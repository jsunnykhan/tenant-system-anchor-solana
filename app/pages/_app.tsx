import "../styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { WalletConnectionProvider } from "../hooks/WalletConnectionProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletConnectionProvider>
  );
}
