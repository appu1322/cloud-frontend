import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS } from '../endpoints';
import { IAuth, IAuthResponse } from '../../interfaces';

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: HEADERS
    }),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, IAuth>({
            query: (payload) => ({
                url: "auth/login",
                method: "POST",
                body: payload,
            })
        }),

        profile: builder.query<IAuthResponse, undefined>({
            query: (search) => ({
                url: "user/login",
                method: "GET",
                params: search,
            })
        })
    }),
});

export const { useLoginMutation } = authService;