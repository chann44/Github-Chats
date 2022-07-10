import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppContext } from '../contexts/_context'


const Home: NextPage = () => {
  const { user, setUser } = useAppContext()
  const [time, setTime] = useState('fetching')
  useEffect(() => {
    (async function () {
      const usr = await axios.get(`http://localhost:4000/api/me`, {
        'withCredentials': true
      })
      setUser(usr.data.login)
    })();
  }, []);





  return (
    <>
      {
        user ? <h1>welcome {user}</h1> : null
      }

    </>
  )


}

export default Home
