import  { useState } from 'react'
import { Chat } from './components/Chat/Chat'
import { Login } from './components/Login/Login'

export const App = () => {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (id: string, token: string) => {
    setIdInstance(id)
    setApiTokenInstance(token)
    setIsLoggedIn(true)
  }

  return (
    <div>
      {isLoggedIn ? (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}
