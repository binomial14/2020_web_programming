import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'

import { ApolloLink } from 'apollo-boost'
import { onError } from 'apollo-link-error'

import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


// const client = new W3CWebSocket('ws://localhost:4000')
// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: { reconnect: true }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})



const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache().restore({})
})

const wrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(wrappedApp, document.getElementById('root'))





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
