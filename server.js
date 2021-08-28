import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers/index.js';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import express from "express"
import http from "http"

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';


const typeDefs = await loadSchema('./schemas/schema.graphql', {  // load from a single schema file
  loaders: [
      new GraphQLFileLoader()
  ]
});
// const schema = makeExecutableSchema(typeDefs, resolvers)

export async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({app})

  await new Promise(res=> httpServer.listen({port:4000 }, res))

  console.log(`🚀 Server ready at 4000`);
}