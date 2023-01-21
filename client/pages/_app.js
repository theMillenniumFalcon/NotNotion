import App from "next/app"
import cookies from "next-cookies"

import UserProvider from "../context/UserContext"
import Layout from "../components/layout"

import "typeface-nunito-sans"
import "typeface-roboto"
import "../shared/global.scss"

const MyApp = ({ Component, pageProps, isAuthenticated }) => {
  return (
    <UserProvider isAuthenticated={isAuthenticated}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

MyApp.getInitialProps = async (context) => {
  let isAuthenticated = false

  const { token } = cookies(context.ctx)
  if (token) {
    isAuthenticated = true
  }

  const appProps = await App.getInitialProps(context)
  return { ...appProps, isAuthenticated }
}

export default MyApp