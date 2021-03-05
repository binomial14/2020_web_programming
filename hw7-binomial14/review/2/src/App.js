import './App.css'

import React, { useEffect, useRef,useCallback, useState } from 'react'
//import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  DELETE_MESSAGES_MUTATION,
  MESSAGES_SUBSCRIPTION
} from './graphql'

function App() {
  //const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [status, setStatus] = useState({})
  //const [opened, setOpened] = useState(false)
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [messages, setMessages] = useState([])
  const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY)
  //if(!loading) setMessages(data.getMessages)
  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  const [deleteMessages] = useMutation(DELETE_MESSAGES_MUTATION)

  const sendMessage = useCallback(
    
    () => {
      
      //e.preventDefault()
      if (!username || !body) return

      addMessage({
        variables: {
          name: username,
          body: body
        }
      })
      setMessages(() => [...messages, {name: username,body: body}])
      setBody('')
    },
    [addMessage, username, body]
  )

  const clearMessages = useCallback(
    () => {
      //e.preventDefault()
      //if (!username || !body) return
      setMessages([])
      deleteMessages()
    },
    [deleteMessages]
  )
  
  const bodyRef = useRef(null)

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }
  
  useEffect(() => {
    if(!loading)
      setMessages(data.getMessages)
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.message.data

        return {
          ...prev,
          messages: [newMessage, ...prev.posts]
        }
      }
    })
    displayStatus(status)
  }, [status,subscribeToMore, loading])
  
  
  
  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {!loading? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
        
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }

          sendMessage({ name: username, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
