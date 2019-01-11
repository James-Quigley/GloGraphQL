import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';

const typeDefs = `
  type User {
    id: ID!
    name: String
    username: String
    email: String
    avatar_url: String
    created_date: String
    updated_date: String
  }

  type Color {
    r: Int
    g: Int
    b: Int
    a: Int
  }

  type Label {
    id: ID!
    name: String!
    color: Color
    created_date: String
    created_by: User
  }

  type Attachment {
    id: ID!
    filename: String
    created_date: String
    created_by: String
    mime_type: String
  }

  type Description {
    text: String
    created_date: String
  }

  type Card {
    id: ID!
    name: String!
    description: Description
    board_id: String
    column_id: String
    created_date: String
    updated_date: String
    members: [User]
    labels: [Label]
    due_date: String
  }

  type Column {
    id: ID!
    name: String
    created_date: String
    created_by: User
    cards: [Card]
  }

  type Board {
    id: ID!
    name: String!
    columns: [Column]
    archived_columns: [Column]
    invited_members: [String]
    members: [User]
    archived_date: String
    labels: [Label]
    created_date: String
    updated_date: String
    created_by: User
  }

  type Comment {
    id: ID!
    card_id: String
    board_id: String
    created_date: String
    updated_date: String
    created_by: User
    text: String
  }

  type Query {
    board(id: ID!): Board
  }
`;

const resolvers = {
  Query: {
    board: async (parentValue, args, request) => {
      if (!request.headers.authorization){
        throw new Error("Authorization header required");
      }

      try {
        const board = (await axios.get(`https://devgloapi.gitkraken.com/v1/glo/boards/${args.id}?fields=id,name,columns,archived_columns,invited_members,members,archived_date,labels,created_date,updated_date,created_by`, {
            headers: {
              "Authorization": request.headers.authorization,
              "Content-Type": "application/json"
            }
          })).data;

        const cards = (await axios.get(`https://devgloapi.gitkraken.com/v1/glo/boards/${args.id}/cards?fields=id,name,description,board_id,column_id,created_date,updated_date,members,labels,due_date`, {
            headers: {
              "Authorization": request.headers.authorization,
              "Content-Type": "application/json"
            }
          })).data;

        board.columns = board.columns.map(column => {
          column.created_by = board.members.find(member => member.id === column.created_by.id) || column.created_by;
          column.cards = cards.filter(card => card.column_id === column.id);
          return column;
        });


        board.labels = board.labels.map(label => {
          label.created_by = board.members.find(member => member.id === label.created_by.id) || label.created_by;
          return label;
        });

        board.columns = board.columns.map(column => {
          column.cards = column.cards.map(card => {
            card.labels = card.labels.map(label => board.labels.find(boardLabel => boardLabel.id === label.id) || label)
            return card;
          })
          return column;
        });

        board.created_by = board.members.find(member => member.id === board.created_by.id) || board.created_by;

        return board;
      } catch (error) {
        console.error("error", error);
        throw new Error(`Failed to make request: ${error}`)
      }
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
