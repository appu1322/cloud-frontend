import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS, OBJECT } from '../endpoints';
import { IExportResponse, IExportResponses, IObjectResponse, IObjectsResponse } from '../../interfaces';

export const objectService = createApi({
    reducerPath: 'objobjectSctService',
    tagTypes: ["addFile"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: HEADERS
    }),
    endpoints: (builder) => ({
        addFolder: builder.mutation<IObjectResponse, object>({
            query: (payload) => ({
                url: OBJECT + "/folder",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["addFile"]
        }),

        addObject: builder.mutation<IObjectResponse, object>({
            query: (payload) => ({
                url: OBJECT,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["addFile"]
        }),

        removeObject: builder.mutation<IObjectResponse, object>({
            query: (payload) => ({
                url: OBJECT,
                method: "DELETE",
                body: payload
            }),
            invalidatesTags: ["addFile"]
        }),

        object: builder.query<IObjectResponse, object>({
            query: (search) => ({
                url: OBJECT,
                method: "GET",
                params: search
            })
        }),

        export: builder.mutation<IExportResponse, object>({
            query: (payload) => ({
                url: OBJECT + "/export",
                method: "POST",
                body: payload
            })
        }),

        exportProgress: builder.query<IExportResponses, object>({
            query: (search) => ({
                url: OBJECT + "/export-progress",
                method: "GET",
                params: search
            })
        }),

        objects: builder.query<IObjectsResponse, object>({
            query: (search) => ({
                url: OBJECT + "/list",
                method: "GET",
                params: search
            }),
            providesTags: ["addFile"]
        })
    }),
});

export const {
    useObjectQuery,
    useObjectsQuery,
    useLazyExportProgressQuery,
    useAddObjectMutation,
    useAddFolderMutation,
    useRemoveObjectMutation,
    useExportMutation
} = objectService;