import axios from "axios";

export const createClient = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
