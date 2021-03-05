import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
    subscription($name: String) {
        post(query: $name){
            mutation
            data{
                name
                receiver
                body
            }
        }
    }
`
