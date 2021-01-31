import Link from "next/link";
import Head from 'next/head'

const firstPost = () => {
    return <div>
        <>
            <Head>
                <title>First post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a style={{ color: "skyblue", textDecoration: "none", textTransform: "uppercase" }}>Back to home</a>
                </Link>
            </h2>
        </>
    </div>
}

export default firstPost;