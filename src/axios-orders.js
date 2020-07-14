import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-cb28d.firebaseio.com/",
});

export default instance;
