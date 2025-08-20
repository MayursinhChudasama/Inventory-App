import { inwardEntry } from "@/models/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const challan = createApi({
  reducerPath: "challan",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/challan/",
  }),
  tagTypes: ['Challan'],
  endpoints: (builder) => ({
    getChallans: builder.query<inwardEntry[], void>({
      query: () => "/",
      providesTags: (result = []) => [
        'Challan',
        ...result.map(({ _id }) => ({ type: 'Challan' as const, id: _id })),
      ],
    }),
    addChallan: builder.mutation<inwardEntry, { body: inwardEntry }>({
      query: ({ body }) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Challan'],
    }),
  }),
});

export const { useGetChallansQuery, useAddChallanMutation } = challan;
export default challan;
