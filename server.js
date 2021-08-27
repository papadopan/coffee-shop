import { ApolloServer, gql } from 'apollo-server';
import { resolvers } from './resolvers/index.js';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';



export async function startApolloServer() {
//   const typeDefs = gql`
//   interface User {
//     name: String!
//   }

//   type Waiter implements User {
//     name: String!
//     id: String!
//   }

//   input waiterInput {
//     name: String!
//     id: String!
//   }

//   type Cook implements User {
//     name: String!
//     recipes: [Recipe]!
//   }

//   input cookInput {
//     name: String!
//     recipes:[recipeInput]!
//   }

//   input recipeInput {
//     name: String
//     time: String
//   }

//   type Recipe {
//     name: String
//     time: String
//     cook: Cook!
//   }

//   type Query {
//     cooks: [Cook]!
//     waiters: [Waiter]!
//     users: [User]!
//   }

//   type Mutation{
//     addCook(input: cookInput): Cook!
//     addWaiter(input: waiterInput): Waiter!
//   }

// `;
const typeDefs = await loadSchema('./schemas/schema.graphql', {  // load from a single schema file
  loaders: [
      new GraphQLFileLoader()
  ]
});
  const server = new ApolloServer({ typeDefs, resolvers});
  const { url } = await server.listen();

  console.log(`🚀 Server ready at ${url}`);
}