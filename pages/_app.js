import Head from "next/head";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, arbitrum, polygon } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { ThemeProvider } from "next-themes";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

const infuraId = process.env.INFURA_ID;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { chains, publicClient } = configureChains(
  [polygon, arbitrum, goerli],
  [infuraProvider({ apiKey: infuraId })]
);

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen h-auto align-content-center bg-hero-pattern bg-fixed bg-cover bg-no-repeat bg-right dark:bg-gradient-radial from-slate-900 via-indigo-900 to-slate-900">
      <Head>
        <link rel="icon" href="9535.gif" type="image/gif" />
      </Head>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
