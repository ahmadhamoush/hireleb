import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
//import toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GetStartedContextProvide } from '@/components/GetStartedContext'
import { useEffect } from 'react'
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  //loader
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      if (loader) loader.style.display = 'none'
    }
  }, [])
  return (
    <GetStartedContextProvide>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        hideProgressBar={true}
        toastStyle={{ backgroundColor: '#2d646d' }}
      />
    </GetStartedContextProvide>
  )
}
