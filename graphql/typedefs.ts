export default `
type User {
  id: ID!
  name: String
  username: String
  email: String
}

type PartialUser {
  id: ID!
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
  created_by: PartialUser
}

type Attachment {
  id: ID!
  filename: String
  created_date: String
  created_by: PartialUser
  mime_type: String
}

type Description {
  text: String
  created_date: String
  updated_date: String
  created_by: PartialUser
  updated_by: PartialUser
}

type Card {
  id: ID!
  name: String!
  description: Description
  board_id: String
  column_id: String
  created_date: String
  updated_date: String
  archived_date: String
  assignees: [User]
  labels: [Label]
  due_date: String,
  comment_count: Int
  attachment_count: Int
  completed_task_count: Int
  total_task_count: Int
  created_by: PartialUser
}

type Column {
  id: ID!
  name: String
  created_date: String
  created_by: PartialUser
  archived_date: String
}

type BoardMember {
  id: ID!
  role: String
  username: String
}

type Board {
  id: ID!
  name: String!
  columns: [Column]
  archived_columns: [Column]
  invited_members: [BoardMember]
  members: [BoardMember]
  archived_date: String
  labels: [Label]
  created_date: String
  created_by: PartialUser
}

type Comment {
  id: ID!
  card_id: String
  board_id: String
  created_date: String
  updated_date: String
  created_by: PartialUser
  text: String
}

type Query {
  board(id: ID!): Board
  boards: [Board]
  user: User
}
`;
