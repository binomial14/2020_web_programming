import './App.css'
import React, { useEffect, useRef, useState, useCallback } from 'react'
// import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from './graphql/index'
function App() {
  // const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [loginname, setloginname] = useState('')
  const bodyRef = useRef(null)
  const [addPost] = useMutation(CREATE_POST_MUTATION)

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

  const { loading, error, data, subscribeToMore } = useQuery(POSTS_QUERY, {
    variables: { username: loginname }
  });
  // console.log(data);

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      variables: {name: loginname},
      updateQuery: (prev, { subscriptionData }) => {
        const newPost = subscriptionData.data.post.data
        // console.log(prev.msg);
        // console.log(prev);
        // console.log(subscriptionData.data.post.data);
        // console.log(newPost);
        // console.log(prev);
        console.log({
          ...prev,
          msg: [...prev.msg, newPost]
        });
        return {
          ...prev,
          msg: [...prev.msg, newPost]
        }
      }
    })
  }, [subscribeToMore, loginname])

  const handleFormSubmit = useCallback(
    (e) => {
      // console.log(loginname);
      // console.log(username);
      // console.log(body);
      addPost({
        variables: {
          name: loginname,
          receiver: username,
          body: body
        }
      })
    },
    [addPost, username, body]
  )

  return (
    (loginname !== '') ?
      <div className="App">
        <div className="App-title">
          <h1>Simple Chat</h1>
          <Button type="primary" danger>
            Clear
        </Button>
        </div>
        <div>
          <h3>Hello {loginname}</h3>
        </div>
        <div className="App-messages">
          {data.msg.length === 0 ? (
            <p style={{ color: '#ccc' }}>
              {!loading ? 'No messages...' : 'Loading...'}
            </p>
          ) : (
              data.msg.map(({ name, receiver, body }, i) => (
                (name === loginname) ?
                  <p className="App-message" key={i}>
                    <Tag color="blue">Sender {name} :</Tag> {body}
                  </p> :
                  <p className="App-message" key={i}>
                    <Tag color="red">Sender {name} :</Tag> {body}
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
            handleFormSubmit()
            setBody('')
          }}
        ></Input.Search>
      </div> :
      <div className="App">
        <div className="App-title">
          <h1>Simple Chat</h1>
        </div>
        <Input.Search
          enterButton="Send"
          placeholder="Enter Your Name To Login"
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: 'error',
                msg: 'Please enter your name to login.'
              })
              return
            }
            setloginname(msg)
          }}
        ></Input.Search>
      </div>

  )
}

export default App
