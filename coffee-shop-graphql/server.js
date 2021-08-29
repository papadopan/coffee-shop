import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers/index.js';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import express from "express"
import http from "http"
import cors from "cors"
import {  upperDirectiveTransformer } from './directives/directives.js'
import { makeExecutableSchema } from '@graphql-tools/schema';



export async function startApolloServer() {
  const app = express()

  // remove cors
  app.use(cors({
    origin: true,
    credentials: true,
  }));


  const httpServer = http.createServer(app)
  const typeDefs = await loadSchema('./schemas/schema.graphql', {  // load from a single schema file
    loaders: [
        new GraphQLFileLoader()
    ]
  });

  let schema = makeExecutableSchema({typeDefs, resolvers})
  schema = upperDirectiveTransformer(schema, "upper")
  const server = new ApolloServer({ schema });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
    cors: false,
  });

  await new Promise(res=> httpServer.listen({port:4000 }, res))

  console.log(`🚀 Server ready at 4000`);
}