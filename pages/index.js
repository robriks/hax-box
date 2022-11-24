import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Markus&apos;s Personal Page</title>
      </Head>

      <div className="flex justify-center">
        <p>welcome blurbl</p>
      </div>

      <div className="flex justify-center">
        <p>list of projects</p>
      </div>
      <Link href='/stablediffusion'>
        <a className="text-blue-500">Generate images from text using AI!</a>
      </Link>

    </div >
  );
}
