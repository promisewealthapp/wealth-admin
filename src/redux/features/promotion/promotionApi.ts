import { apiSlice } from "../apiSlice/apiSlice";
export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query({
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
      query: (info) => {
        return {
          url: "/promotions",
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
