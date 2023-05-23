import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        id : ID! 
        email : String
        password : String 
    }


  type Query {
    users: [User],
    user:User
  }

  type Mutation{
    createUser(email:String,password:String):User
  }
`;

export {typeDefs}