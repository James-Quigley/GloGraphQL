import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import typeDefs from './typedefs';

import boardResolver from './resolvers/board';

const resolvers = {
  Query: {
    board: boardResolver
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
