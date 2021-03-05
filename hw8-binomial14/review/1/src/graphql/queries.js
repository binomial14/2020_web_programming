import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
    query($username: String){
        msg(query: $username){
            name
            receiver
            body
        }
    }
`