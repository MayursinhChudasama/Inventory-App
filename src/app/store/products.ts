import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products/",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "/",
      providesTags: (result = []) => [
        { type: "Product" as const, id: "LIST" },
        ...result.map((product: any) => ({
          type: "Product" as const,
          id: product._id,
        })),
      ],
    }),
    putProducts: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product" as const, id },
      ],
    }),
  }),
});

export const { useGetProductsQuery, usePutProductsMutation } = products;
export default products;
