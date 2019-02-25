import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import typeDefs from './typedefs';

import boardResolver from './resolvers/board';
import userResolver from './resolvers/user';
import boardsResolver from './resolvers/boards';

const resolvers = {
  Query: {
    board: boardResolver,
    user: userResolver,
    boards: boardsResolver
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
