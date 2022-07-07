import '../styles/globals.css'
import { AppContext } from '../contexts/_context'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { useState } from 'react'
import Cookies from 'js-cookie'


function MyApp({ Component, session, pageProps }: AppProps) {
  const [user, setUser] = useState();
  const sharedState = {
    user, setUser,

  }
  return (
    <div className='bg-primary min-h-screen text-white'>
      <AppContext.Provider value={sharedState}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </div>

  )
}

export default MyApp;