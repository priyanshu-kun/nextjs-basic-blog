import Head from 'next/head';
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Intro to next</title>
        <meta name="keywords" content="web development, programming, introduction" />
      </Head>
      <h1>Hello nextjs</h1>
      <Link href="/about"><button>go to about</button></Link>
    </div>
  )
}
