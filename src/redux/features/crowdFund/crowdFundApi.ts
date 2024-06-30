import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const crowdFundApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCrowdFunds: builder.query({
      query: (query) => {
        return {
          url: `/crowdFund?${query}`,
        };
      },
      providesTags: [tagTypes.crowdFund],
    }),
    getCrowdFundById: builder.query({
      query: (id) => `/crowdFund/${id}`,
    }),
    addCrowdFund: builder.mutation({
      query: (info) => {
        return {
          url: "/crowdFund",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.crowdFund],
    }),
    editCrowdFund: builder.mutation({
      query: (info) => {
        return {
          url: `/crowdFund/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.crowdFund],
    }),
    deleteCrowdFund: builder.mutation({
      query: (id) => {
        return {
          url: `/crowdFund/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.crowdFund],
    }),
    uploadImage: builder.mutation({
      query: (file) => {
        return {
          url: "/upload/image",
          method: "POST",
          body: file,
        };
      },
    }),
    uploadVideo: builder.mutation({
      query: (file) => {
        return {
          url: "/upload/video",
          method: "POST",
          body: file,
        };
      },
    }),
  }),
});

export const {
  useGetCrowdFundsQuery,
  useAddCrowdFundMutation,
  useDeleteCrowdFundMutation,
  useEditCrowdFundMutation,
  useGetCrowdFundByIdQuery,
  useUploadImageMutation,
  useUploadVideoMutation,
} = crowdFundApi;
