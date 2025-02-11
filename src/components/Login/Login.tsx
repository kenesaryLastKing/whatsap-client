import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

type LoginProps = {
  onLogin: (id: string, token: string) => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')

  const handleSubmit = () => {
    onLogin(idInstance, apiTokenInstance)
  }

  return (
    <div>
      <TextField
        label="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <TextField
        label="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  )
}
