import { ApolloServer } from 'apollo-server';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  formatError: err => {
    return err;
  }
 });

server.listen({port: 4000}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});