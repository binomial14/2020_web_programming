import { gql } from 'apollo-boost'

export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage (
    $name: String!
  ){
    deleteMessage (
      data: {
        name: $name
      }
    ){
      name
      body
      dest
    }
  }
`