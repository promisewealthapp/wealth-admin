import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: (query) => {
        return {
          url: `/chatGroup?${query}`,
        };
      },
      providesTags: [tagTypes.group],
    }),
    getGroupById: builder.query({
      query: (id) => `/chatGroup/${id}`,
    }),
    addGroup: builder.mutation({
      query: (info) => {
        return {
          url: "/chatGroup",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.group],
    }),
    editGroup: builder.mutation({
      query: (info) => {
        return {
          url: `/chatGroup/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.group],
    }),
    deleteGroup: builder.mutation({
      query: (id) => {
        return {
          url: `/chatGroup/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.group],
    }),
  }),
});
export const {
  useGetGroupsQuery,
  useAddGroupMutation,
  useDeleteGroupMutation,
  useEditGroupMutation,
  useGetGroupByIdQuery,
} = groupApi;
