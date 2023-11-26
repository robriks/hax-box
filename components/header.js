import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";
import BirbBanner from "../public/birb-banner.jpg";

export default function Header() {
  return (
    <div className="justify-center h-auto w-auto">
      <header className="bg-header">
        <nav className="p-6 mx-auto justify-between max-w-screen-xl">
          <div className="flow-root mt-2">
            <div className="flex justify-center place-content-center rounded-full">
              <Link href="/" className="max-w-md rounded-full drop-shadow-xl">

                <Image
                  src={BirbBanner}
                  className="rounded-full"
                  alt="KweenBirb header banner"
                ></Image>

              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex shrink justify-center w-auto mt-2">
        <div className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-900 dark:bg-gradient-to-r dark:from-purple-600 dark:via-indigo-500 dark:to-slate-700 p-3 sm:p-4 md:p-6 shadow-2xl rounded-full border-4 border-indigo-400">
          <div className="flex whitespace-nowrap justify-items-stretch p-1 text-[11px] sm:text-lg space-x-3 sm:space-x-7 md:space-x-10 w-auto text-white font-bold">
            <Link href="/" className="nav-link hover:underline">
              Home
            </Link>
            <Link href="/about" className="nav-link hover:underline">
              About
            </Link>
            <Link
              href="https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee"
              className="nav-link hover:underline">
              Blog
            </Link>
            <Link href="/nft" className="nav-link hover:underline">
              Custom NFTs
            </Link>
            <Link href="/image-gen" className="nav-link hover:underline">
              AI Images
            </Link>
            <Link href="/chatbot" className="nav-link hover:underline">
              AI Chat
            </Link>
          </div>
        </div>
      </div>
      <div className="flex float-right w-1/2 sm:w-1/3 md:w-1/3 md:mr-8 lg:w-1/3 lg:mr-20 mt-6">
        <ThemeToggle />
      </div>
    </div>
  );
}
