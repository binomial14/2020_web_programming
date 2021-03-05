import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createMsg(
    $name: String!
    $receiver: String! 
    $body: String!
    ) {
        createMsg(
            data: {
                name: $name
                receiver: $receiver
                body: $body
            }
        ) {
            name
            receiver
            body
        }
    }
`
