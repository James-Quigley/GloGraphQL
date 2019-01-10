import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Card {
    title: String
  }

  type Query {
    cards: [Card]
  }
`;

const resolvers = {
  Query: {
    cards: () => ([{title: "test"}, {title: "test2"}])
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
