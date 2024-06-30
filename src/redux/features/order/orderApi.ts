import { apiSlice } from "../apiSlice/apiSlice";
import { tagTypes } from "../apiSlice/tagTypesList";

export const OrderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (query) => {
        return {
          url: `/orders?${query}`,
        };
      },
      providesTags: [tagTypes.order],
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    addOrder: builder.mutation({
      query: (info) => {
        return {
          url: "/orders",
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.order],
    }),
    editOrder: builder.mutation({
      query: (info) => {
        return {
          url: `/orders/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.order],
    }),
    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrderQuery,
  useEditOrderMutation,
  useDeleteOrderMutation,
  useAddOrderMutation,
} = OrderApi;
