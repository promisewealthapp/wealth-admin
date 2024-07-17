import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";
export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query({
      providesTags: [tagTypes.promotion],
      query: (query) => {
        return {
          url: `/promotion?${query}`
        };
      }
    }),
    getPromotionById: builder.query({
      query: (id) => `/promotions/${id}`
    }),
    addPromotion: builder.mutation({
      invalidatesTags: [tagTypes.promotion],
      query: (info) => {
        return {
          url: "/promotion",
          method: "POST",
          body: info
        };
      }
    }),
    editPromotion: builder.mutation({
      query: (info) => {
        return {
          url: `/promotions/${info._id}`,
          method: "PATCH",
          body: info
        };
      }
    }),
    deletePromotion: builder.mutation({
      invalidatesTags: [tagTypes.promotion],
      query: (id) => {
        return {
          url: `/promotion/${id}`,
          method: "DELETE"
        };
      }
    })
  })
});
export const {
  useGetPromotionsQuery,
  useAddPromotionMutation,
  useDeletePromotionMutation,
  useEditPromotionMutation,
  useGetPromotionByIdQuery
} = promotionApi;
