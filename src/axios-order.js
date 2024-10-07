import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-67a3b-default-rtdb.firebaseio.com/"
});

export default instance;