import { gql } from 'apollo-boost'

export const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        title
        body
        author {
          name
        }
        published
      }
    }
  }
`
