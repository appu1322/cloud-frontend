import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS, OBJECT } from '../endpoints';
import { IObjectResponse, IObjectsResponse } from '../../interfaces';

export const objectService = createApi({
    reducerPath: 'objobjectSctService',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: HEADERS
    }),
    endpoints: (builder) => ({
        object: builder.query<IObjectResponse, object>({
            query: (search) => ({
                url: OBJECT,
                method: "GET",
                params: search
            })
        }),

        objects: builder.query<IObjectsResponse, object>({
            query: (search) => ({
                url: OBJECT + "/list",
                method: "GET",
                params: search
            })
        })
    }),
});

export const { useObjectQuery, useObjectsQuery } = objectService;