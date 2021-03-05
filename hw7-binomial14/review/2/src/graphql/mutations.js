import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $name: String!
    $body: String!
  ) {
    createMessage(
        name: $name
        body: $body
    ) {
      name
      body
    }
  }
`

export const DELETE_MESSAGES_MUTATION = gql`
  mutation deleteMessages {
    deleteMessages
  }
`

