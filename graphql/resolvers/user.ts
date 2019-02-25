import axios from 'axios';

export default async (parentValue, args, request) => {
  if (!request.headers.authorization){
    throw new Error("Authorization header required");
  }

  try {
    return (await axios.get(`https://gloapi.gitkraken.com/v1/glo/user?fields=created_date,email,name,username`, {
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
