import Axios from "axios";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const axios = Axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": `max-age=${ONE_DAY_IN_SECONDS}`,
  },
});
