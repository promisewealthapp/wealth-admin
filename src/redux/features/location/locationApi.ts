import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (query) => {
        return {
          url: `/location?${query}`,
        };
      },
      providesTags: [tagTypes.location],
    }),
    getLocationById: builder.query({
      query: (id) => `/location/${id}`,
    }),
    addLocation: builder.mutation({
      query: (info) => {
        return {
          url: "/location",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.location],
    }),
    editLocation: builder.mutation({
      query: (info) => {
        return {
          url: `/location/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.location],
    }),
    deleteLocation: builder.mutation({
      query: (id) => {
        return {
          url: `/location/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.location],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useAddLocationMutation,
  useDeleteLocationMutation,
  useEditLocationMutation,
  useGetLocationByIdQuery,
} = locationApi;
