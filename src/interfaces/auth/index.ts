import { IResponse } from "../shared/response";

export interface IAuth {
    email: string;
    password: string;
    confirmPassword?: string;
}


export interface IUser {
    _id: string;
    token: string;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE';
    status: 'ACTIVE' | 'INACTIVE';
    _role: {
        _id: string;
        name: string;
        role: 'SUPERADMIN' | 'USER';
    };
    contact: {
        email: string;
        mobileNumber: {
            dialCode: string;
            iso2: string;
            country: string;
        };
    };
    createdAt: string;
    updatedAt: string;
}

export interface IAuthResponse extends IResponse {
    data: IUser
}

