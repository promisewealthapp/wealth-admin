import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const flippingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlipping: builder.query({
      query: (query) => {
        return {
          url: `/flipping?${query}`,
        };
      },
      providesTags: [tagTypes.flipping],
    }),
    getFlippingById: builder.query({
      query: (id) => `/flipping/${id}`,
    }),
    addFlipping: builder.mutation({
      query: (info) => {
        return {
          url: "/flipping",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.flipping],
    }),
    editFlipping: builder.mutation({
      query: (info) => {
        return {
          url: `/flipping/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.flipping],
    }),
    deleteFlipping: builder.mutation({
      query: (id) => {
        return {
          url: `/flipping/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.flipping],
    }),
  }),
});

export const {
  useGetFlippingQuery,
  useAddFlippingMutation,
  useDeleteFlippingMutation,
  useEditFlippingMutation,
  useGetFlippingByIdQuery,
} = flippingApi;
