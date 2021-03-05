import { gql } from 'apollo-boost'

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $name: String!
    $body: String!
    $dest: String!
  ) {
    createMessage(
      data: {
        name: $name
        body: $body
        dest: $dest
      }
    ) {
      name
      body
      dest
    }
  }
`