import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query {
    message {
        name
        body
        dest
    }
  }
`