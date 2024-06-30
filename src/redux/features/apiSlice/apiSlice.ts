import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypesList";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,

    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: tagTypesList,
});
