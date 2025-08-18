import { CreateUser, UpdateUser, User } from "@/models/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const users = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/",
      providesTags: (result = []) => [
        { type: "User" as const, id: "LIST" },
        ...result.map((user) => ({ type: "User" as const, id: user._id })),
      ],
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<User, { id: string; body: UpdateUser }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User" as const, id },
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = users;
export default users;
