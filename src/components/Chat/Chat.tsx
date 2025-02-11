import React, { useState } from 'react'
import { TextField, Button, List, ListItem } from '@mui/material'
import axios from 'axios'

type ChatProps = {
  idInstance: string
  apiTokenInstance: string
}

type Message = {
  id: string
  text: string
  sender: 'me' | 'them'
}

export const Chat: React.FC<ChatProps> = ({ idInstance, apiTokenInstance }) => {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = () => {
    axios
      .post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${phone}@c.us`,
          message: message,
        }
      )
      .then((res) => {
        setMessages([
          ...messages,
          { id: res.data.idMessage, text: message, sender: 'me' },
        ])
        setMessage('')
      })
      .catch((err) => console.log(err))
  }

  const receiveMessages = () => {
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      )
      .then((res) => {
        const receivedMessage =
          res.data.body.messageData.textMessageData.textMessage
        setMessages([
          ...messages,
          {
            id: res.data.body.idMessage,
            text: receivedMessage,
            sender: 'them',
          },
        ])
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <TextField
        label="Recipient Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={receiveMessages}>Receive</Button>
      <List>
        {messages.map((msg) => (
          <ListItem
            key={msg.id}
            style={{ textAlign: msg.sender === 'me' ? 'right' : 'left' }}
          >
            {msg.text}
          </ListItem>
        ))}
      </List>
    </div>
  )
}
