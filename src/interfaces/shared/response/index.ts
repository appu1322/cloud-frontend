export interface IResponse {
    message: string
    success: boolean
}

export interface IErrorResponse {
    data: {
        message: string
        success: boolean
    }
}


