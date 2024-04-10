import axios from "axios";

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  },
});

export default instance;
