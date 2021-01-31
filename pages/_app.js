import '../styles/globals.css'
import Layout from "../components/Layout";
import Alert from "../components/Alert"

function MyApp({ Component, pageProps }) {
  return (
    <Alert>
      <Layout home={true}>
        <Component {...pageProps} />
      </Layout>
    </Alert>

  )
}

export default MyApp
