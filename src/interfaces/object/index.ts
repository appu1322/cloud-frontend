import { IResponse } from "../shared";

interface IObject {
    _id: string,
    name: string;
    sizeInByte: number;
    type: string;
    extension: string;
    isFolder: boolean;
    parentId?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IObjectsResponse extends IResponse {
    data: IObject[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalRecords: number;
    }
}

export interface IObjectResponse extends IResponse {
    data: IObject;
}
