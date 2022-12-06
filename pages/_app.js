import '../styles/globals.css'
import Header from "../components/header.js";
import Footer from "../components/footer.js";


function MyApp({ Component, pageProps }) {
  return (
    <div className='min-h-screen h-auto align-content-center bg-hero-pattern bg-fixed bg-no-repeat bg-cover bg-right'>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
