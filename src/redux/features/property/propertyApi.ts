import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const propertyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperty: builder.query({
      query: (query) => {
        return {
          url: `/property?${query}`,
        };
      },
      providesTags: [tagTypes.property],
    }),
    getPropertyById: builder.query({
      query: (id) => `/property/${id}`,
    }),
    addProperty: builder.mutation({
      query: (info) => {
        return {
          url: "/property",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.property],
    }),
    editProperty: builder.mutation({
      query: (info) => {
        return {
          url: `/property/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.property],
    }),
    deleteProperty: builder.mutation({
      query: (id) => {
        return {
          url: `/property/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.property],
    }),
  }),
});
export const {
  useGetPropertyQuery,
  useAddPropertyMutation,
  useDeletePropertyMutation,
  useEditPropertyMutation,
  useGetPropertyByIdQuery,
} = propertyApi;
