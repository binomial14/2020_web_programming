import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query {
    getMessages {
      name 
      body
    }
  }
`
