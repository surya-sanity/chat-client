import { User } from "../models/userModel";
import { allApis } from "./allApi";

export const userApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => `api/users/current`,
      providesTags: ['CurrentUser']
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => `api/users/all`,
      providesTags: ['Users']
    }),
    updateCurrentUser: builder.mutation<User, { firstName?: string, lastName?: string, avatar?: string, id: string }>({
      query: ({ firstName, lastName, avatar, id }) => {
        return {
          url: `api/users/update`,
          method: 'PUT',
          body: { firstName, lastName, avatar, id }
        }
      },
      invalidatesTags: ['CurrentUser']
    }),
    deleteUserById: builder.mutation<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `api/users/deleteUser/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_) => ['Users']
    }),
    deleteAllUsers: builder.mutation<any, void>({
      query: () => {
        return {
          url: `api/users/deleteAll`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_) => ['Users']
    }),
  })
});

export const { useGetCurrentUserQuery, useGetAllUsersQuery, useDeleteAllUsersMutation, useDeleteUserByIdMutation, useUpdateCurrentUserMutation } = userApi;