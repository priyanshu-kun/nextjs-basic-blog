import Layout from '../../components/Layout'
import Head from "next/head"
import fs from "fs";
import path from "path"
import matter from "gray-matter";
import remark from 'remark'
import html from 'remark-html'
const postsDirectory = path.join(process.cwd(), 'posts');
import Date from '../../components/date'
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <hr style={{ width: "100%", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}

function getAllPostsIds(fileNames) {
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getStaticPaths() {
    const fileNames = fs.readdirSync(postsDirectory)
    const paths = getAllPostsIds(fileNames);
    return {
        paths,
        fallback: false
    }
}


async function getPostData(fileContents, id) {
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}

export async function getStaticProps({ params }) {

    const fullPath = path.join(postsDirectory, `${params.id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const postData = await getPostData(fileContents, params.id);
    return {
        props: {
            postData
        }
    }
}