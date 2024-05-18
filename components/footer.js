import Image from "next/image";
import githubLogo from "../public/github-logo.png";
import twitterLogo from "../public/twitter-logo.png";
import instagramLogo from "../public/instagram-logo.png";

export default function Footer() {
  return (
    <div className="justify-center h-auto w-auto">
      <div className="justify-center text-xs">
        <h2 className="text-center mb-2">
          Copyright © 2024 Osterlund Dapp Solutions
        </h2>
        <h2 className="text-center font-bold">Contact:</h2>
      </div>

      <div className="flex justify-center">
        <div className="p-4">
          <a href="https://github.com/robriks/HuskyCoin">
            <Image
              alt="Github Logo"
              priority={true}
              src={githubLogo}
              width={32}
              height={32}
            />
          </a>
        </div>
        <div className="p-4">
          <a href="https://twitter.com/marsterlund">
            <Image
              alt="Twitter Logo"
              src={twitterLogo}
              width={32}
              height={32}
            />
          </a>
        </div>
        <div className="p-4">
          <a href="https://instagram.com/marsterlund">
            <Image
              alt="Instagram Logo"
              src={instagramLogo}
              width={32}
              height={32}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
