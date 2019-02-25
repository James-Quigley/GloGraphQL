import axios from 'axios';

export default async (parentValue, args, request) => {
  if (!request.headers.authorization){
    throw new Error("Authorization header required");
  }

  try {
    return (await axios.get(`https://gloapi.gitkraken.com/v1/glo/boards?fields=id,name,columns,archived_columns,invited_members,members,archived_date,labels,created_date,updated_date,created_by`, {
        headers: {
          "Authorization": request.headers.authorization,
          "Content-Type": "application/json"
        }
      })).data;
  } catch (error) {
    console.error("error", error);
    throw new Error(`Failed to make request: ${error}`)
  }
}
