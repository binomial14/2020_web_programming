import './App.css'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  DELETE_MESSAGE_MUTATION,
  MESSAGES_SUBSCRIPTION
} from './graphql'

function App() {
  // const { status, opened, messages, sendMessage, clearMessages } = useChat()
  const {opened} = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [dest, setDest] = useState('')
  const [display, setDisplay] = useState(false)

  const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY)
  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  const [removeMessage] = useMutation(DELETE_MESSAGE_MUTATION)


  const bodyRef = useRef(null)

  // const displayStatus = (s) => {
  //   if (s.msg) {
  //     const { type, msg } = s
  //     const content = {
  //       content: msg,
  //       duration: 0.5
  //     }

  //     switch (type) {
  //       case 'success':
  //         message.success(content)
  //         break
  //       case 'info':
  //         message.info(content)
  //         break
  //       case 'danger':
  //       default:
  //         message.error(content)
  //         break
  //     }
  //   }
  // }

  useEffect(() => {
    console.log("subscribe");
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newMessage = subscriptionData.data.message.data
        console.log(newMessage)
        if(subscriptionData.data.message.mutation == "CREATED") {
          return {
            ...prev,
            message: newMessage
          }
        }
        else if(subscriptionData.data.message.mutation == "DELETED") {
          
          return {
            ...prev,
            message: newMessage
          }
        } 
        
      }
    })
  }, [subscribeToMore])

  // useEffect(() => {
  //   displayStatus(status)
  // }, [status])

  const handleMessageSubmit = useCallback(
    (e) => {
      // e.preventDefault()

      if (!username || !body || !dest) return

      addMessage({
        variables: {
          name: username,
          body: body,
          dest: dest
        }
      })

      // setUsername('')
      setBody('')
    },
    [addMessage, username, body, dest]
  )
  
  // const clearMessage = useCallback(
  //   (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   removeMessage();
  //   // subscribeToMore();
  // }
  // )

  const clearMessage = () => {
      // e.preventDefault();
      // e.stopPropagation();
      removeMessage({
        variables: {
          name: username
        }
      });
      console.log(username)
      // subscribeToMore();
    }
    

  const changeUsername = useCallback( // what is this...
    (e) => {
      setUsername(e.target.value);
      setDisplay(false);
    } 
  )

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessage}>
          Clear
        </Button>
      </div>
      <Input.Search
        placeholder="Username"
        value={username}
        enterButton="Confirm"
        onChange={changeUsername}
        style={{ marginBottom: 10 }}
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     bodyRef.current.focus()
        //   }
        // }
        // }
        onSearch={(e) => setDisplay(true)}
      ></Input.Search>
      <div className="App-messages">
        {/* {data.message.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          data.message.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )} */}
        {loading ? (
          <p style={{ color: '#ccc' }}>
          Loading...
          </p>
        ):error ? (
          <p style={{ color: '#ccc' }}>
          Error :(
          </p>
        ):data.message.length === 0 || display !== true? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          data.message.map(({ name, body, dest }, i) => (
            name === username ? (
              <p className="App-message" key={i}>
                <Tag color="blue">{dest}</Tag> {body}
              </p>
            ) : dest === username ? (
              <p className="App-message" key={i}>
                <Tag color="red">{name}</Tag> {body}
              </p>
            ) : (
              <p className="App-message" key={i}>
                
              </p>
            )
          ))
        )
        }
      </div>
      
      <Input
        placeholder="Destination"
        value={dest}
        onChange={(e) => setDest(e.target.value)}
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
        // onSearch={(msg) => {
        //   if (!msg || !username) {
        //     displayStatus({
        //       type: 'error',
        //       msg: 'Please enter a username and a message body.'
        //     })
        //     return
        //   }

        //   sendMessage({ name: username, body: msg })
        //   setBody('')
        // }}
        onSearch={handleMessageSubmit}
      ></Input.Search>
    </div>
  )
}

export default App
