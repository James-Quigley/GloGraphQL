import axios from 'axios';

export default async (parentValue, args, request) => {
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
