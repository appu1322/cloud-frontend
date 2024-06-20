import { ITeam } from "../configuration";
import { IResponse } from "../shared/response";

export interface IAuth {
    email: string;
    password: string;
    confirmPassword?: string;
}



export interface IUser {
    _id: string;
    userId: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: {
        country: string;
        dialCode: string;
        iso2: string;
        number: string;
    };
    role: string[];
    _role: {
        name: string;
        role: "ADMIN" | "SUPERADMIN";
        _id: string;
        resources: string[];
    }
    token: string;
    integrationCredentials: {
        access_token: string
    }
    integrationMeta: {
        email: string;
        family_name: string;
        given_name: string;
        hd: string;
        id: string;
        locale: string;
        name: string;
        verified_email: string;
        picture: string;

    }
    department: ITeam;
    designation: string;
}

export interface IAuthResponse extends IResponse {
    data: IUser
}

