import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'hello',
      fields: {
        hello: {
          type: GraphQLString,
          resolve() {
            return 'world';
          }
        }
      }
    })
  }),
  graphiql: process.env.NODE_ENV !== 'production'
}));

app.listen(8080);
