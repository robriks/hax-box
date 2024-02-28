import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import markus from "../public/markus.jpg";

export default function NFT() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Markus</title>
      </Head>

      <div className="justify-center sm:flex">
        <div className="relative flex sm:p-24 p-52 rounded-3xl shadow-2xl">
          {/* img is originally 1080 * 1350 */}
          <div className="max-w-xs min-w-fit">
            <Image
              src={markus}
              fill="true"
              alt="Headshot"
              className="rounded-3xl"
            />
          </div>
          <h1 className="max-w-md backdrop-blur-md absolute flex px-4 py-2 mt-4 sm:p-3 md:px-2 md:py-3 lg:px-2 lg:py-4 rounded-xl sm:rounded-2xl whitespace-nowrap text-violet-100 text-[25px] sm:text-xs md:text-[15px] lg:text-[16px] font-extrabold leading-9 top-3/4 sm:top-2/3 left-1/2 -translate-x-1/2">
            About Markus Osterlund
          </h1>
        </div>
        <div className="place-self-center backdrop-blur-xs rounded-3xl mt-4 mx-4 sm:mx-4 sm:my-4 shadow-2xl">
          <p className="p-6 text-sm sm:text-xs lg:text-lg sm:place-self-center sm:ml-2 md:text-md sm:max-w-prose">
            <a className="text-[16px] sm:text-sm lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              An orchestral musician
            </a>{" "}
            by day and smart contract programmer by night, Markus
            Osterlund&apos;s two main professional foci are music and
            technology. His work oscillates between weekly performances with the
            National Symphony Orchestra and late nights fiddling with his
            Solidity smart contracts or Javascript webapps like the one
            you&apos;re on now:
            <a href="https://horn.technology" className="text-blue-500">
              {" "}
              horn.technology
              {" & "}
              hax.box
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-8 text-sm">
        <div className="flex flex-wrap -m-4">
          <div className="p-4">
            <div className="flex rounded-lg h-full flex-col">
              <h1 className="mx-auto my-8 mb-6 text-center bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-900 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl sm:mb-10">
                Projects
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 mb-3">
                <Link
                  href="https://github.com/robriks/nouns-prop-lot"
                  legacyBehavior
                >
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-bold">⌐◨-◨</p>
                      <p className="text-base text-center font-bold mb-2">
                        Nouns PropLot Protocol
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        A permissionless protocol extending Nouns governance
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/chatbot" legacyBehavior>
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-bold mt-1">
                        🤖 💬
                      </p>
                      <p className="text-base text-center font-bold mb-2 sm:whitespace-nowrap">
                        Smart AI Chatbot
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        Communicate with an Artificial Intelligence via chat app
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/image-gen" legacyBehavior>
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-bold mt-1">
                        🤖 🖼️
                      </p>
                      <p className="text-base text-center font-bold mb-2 sm:whitespace-nowrap">
                        Image Generator
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        Generate images from text descriptions using AI
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="https://huskycoin.vercel.app" legacyBehavior>
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-extrabold text-orange-400">
                        ₿<a className="text-blue-600">&nbsp;Ξ</a>
                      </p>
                      <p className="text-base text-center font-bold mb-2">
                        Web3 Tutorials
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        Learn crypto fundamentals by using a blockchain
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee"
                  legacyBehavior
                >
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-bold">⛓️ 📝</p>
                      <p className="text-base text-center font-bold mb-2">
                        On-Chain Blog
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        Blog entries on Solidity security exploits hosted on
                        Ethereum!
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://github.com/robriks/ethernaut-solutions"
                  legacyBehavior
                >
                  <div className="flex items-center h-48 rounded-3xl border-2 border-indigo-300 p-2 cursor-pointer shadow-2xl">
                    <div>
                      <p className="text-lg text-center font-bold">🧑🏻‍💻</p>
                      <p className="text-base text-center font-bold mb-2">
                        Ethical Hacking
                      </p>
                      <p className="ml-1 text-[11px] leading-snug hover:underline">
                        My solutions to Ethernaut, a CTF for learning Solidity
                        by hacking
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="backdrop-blur-xs rounded-3xl mt-8 mx-4 sm:mx-4 sm:my-4 shadow-xl">
          <p className="p-6 text-sm font-bold lg:text-lg sm:place-self-center sm:ml-2 md:text-md">
            <a className="text-[16px] sm:text-sm lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              Are you looking for&nbsp;
            </a>
            a protocol security audit or EVM smart contract/Solidity & JS
            developer?
          </p>
          <p className="px-6 pb-6 text-sm lg:text-lg sm:place-self-center sm:ml-2 md:text-md">
            Contact me with inquiries!
          </p>
        </div>
      </div>
    </div>
  );
}
