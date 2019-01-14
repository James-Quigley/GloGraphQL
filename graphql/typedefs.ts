export default `
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
