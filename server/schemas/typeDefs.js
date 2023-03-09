const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    // TODO: describe user model
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    // TODO: describe Book
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser( // args ): // response
    saveBook( // args ): // response
    removeBook( // args ): // response
  }
`;

module.exports = typeDefs;
