import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: (query) => {
        return {
          url: `/faq?${query}`,
        };
      },
      providesTags: [tagTypes.faq],
    }),

    getFaqById: builder.query({
      query: (id) => `/faq/${id}`,
    }),

    addFaq: builder.mutation({
      query: (info) => {
        return {
          url: "/faq",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.faq],
    }),

    editFaq: builder.mutation({
      query: (info) => {
        return {
          url: `/faq/${info._id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.faq],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
} = faqApi;
