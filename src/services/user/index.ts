import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS, USER } from '../endpoints';
import { IAuthResponse } from '../../interfaces';

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: HEADERS
    }),
    endpoints: (builder) => ({
        profile: builder.query<IAuthResponse, object>({
            query: () => ({
                url:  USER + "/profile",
                method: "GET",
            })
        })
    }),
});

export const { useLazyProfileQuery } = userService;