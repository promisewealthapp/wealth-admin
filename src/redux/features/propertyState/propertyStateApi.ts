import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const propertyStateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyState: builder.query({
      query: (id) => {
        return {
          url: `/propertyState?propertyId=${id}`,
        };
      },
      providesTags: [tagTypes.propertyState],
    }),
    getPropertyStateById: builder.query({
      query: (id) => `/propertyState/${id}`,
    }),
    addPropertyState: builder.mutation({
      query: (info) => {
        return {
          url: "/propertyState",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.propertyState],
    }),
    editPropertyState: builder.mutation({
      query: (info) => {
        return {
          url: `/propertyState/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.propertyState],
    }),
    deletePropertyState: builder.mutation({
      query: (id) => {
        return {
          url: `/propertyState/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.propertyState],
    }),
  }),
});
export const {
  useGetPropertyStateByIdQuery,
  useGetPropertyStateQuery,
  useEditPropertyStateMutation,
  useDeletePropertyStateMutation,
  useAddPropertyStateMutation,
} = propertyStateApi;
