import axios from "axios";
const MAIN_URL = "https://gameoflife-api.herokuapp.com/";
const get = (url) => {
  let response;
  try {
    response = axios.get(`${MAIN_URL}${url}`);
  } catch (e) {
    console.log(e);
  }
  return response;
};

export default {get};
