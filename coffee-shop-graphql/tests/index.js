import { ApolloServer , gql} from 'apollo-server';
// import { resolvers } from '../resolvers/index.js';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const typeDefs = gql`
  type Query {
    hello: String
    resolved: String
    married: Boolean
  }
`;

const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks:true,
    mockEntireSchema:false
  })

server.listen().then(({url})=>{
  console.log('====================================');
  console.log(`Testing is listening to port ${url}`);
  console.log('====================================');
})

