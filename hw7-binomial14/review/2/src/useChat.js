import { useState } from 'react'


// import { w3cwebsocket as W3CWebSocket } from 'websocket'





const useChat = () => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)
  
  client.onmessage = (message) => {
    const { data } = message
    console.log(message)
    const [task, payload] = JSON.parse(data)
    
    switch (task) {
      case 'init': {
        setMessages(() => payload)
        break
      }
      case 'output': {
        setMessages(() => [...messages, payload])
        break
      }
      case 'status': {
        setStatus(payload)
        break
      }
      case 'cleared': {
        setMessages([])
        break
      }
      default:
        break
    }
  }

  client.onopen = () => {
    setOpened(true)
  }

  const sendData = (data) => {
    client.send(JSON.stringify(data))
  }

  const sendMessage = (msg) => {
    sendData(['input', msg])
    //client.send({'data':JSON.stringify(['aa',body])});
    // TODO
  }

  const clearMessages = () => {
    sendData(['clear'])
    // TODO
  }

  return {
    status,
    opened,
    messages,
    sendMessage,
    clearMessages
  }
}

export default useChat

