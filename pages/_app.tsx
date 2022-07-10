import '../styles/globals.css'
import { AppContext } from '../contexts/_context'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { useEffect, useState } from 'react'
import { SocketContext, socket } from "../contexts/socket"


function MyApp({ Component, session, pageProps }: AppProps) {
  const [user, setUser] = useState();
  const sharedState = {
    user, setUser,
  }
  return (
    <div className='bg-black text-white'>
      <SocketContext.Provider value={socket}>
      <AppContext.Provider value={sharedState}>
        <Component {...pageProps} />
      </AppContext.Provider>
      </SocketContext.Provider>
    </div>

  )
}

export default MyApp;
