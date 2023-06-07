import Head from "next/head";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, arbitrum, polygon } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

const infuraId = process.env.INFURA_ID;

const { chains, provider } = configureChains(
  [polygon, arbitrum, goerli],
  [infuraProvider({ apiKey: infuraId })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen h-auto align-content-center bg-hero-pattern bg-fixed bg-cover bg-no-repeat bg-right dark:bg-gradient-radial from-slate-900 via-indigo-900 to-slate-900">
      <Head>
        <link rel="icon" href="9535.gif" type="image/gif" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
