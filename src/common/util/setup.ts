import axios from "axios";
export const fetchInitialState = async (uri: string) => {
  try {
    const resp = await axios.get(`${uri}/getState`);
    return resp.data;
  } catch (e) {
    console.log("Error fetching initial state:");
    console.log("e");
    console.log(e);
  }
};
