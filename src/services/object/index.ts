import { IObjectsResponse } from "../../interfaces";
import HttpService from "../http"

const ObjectService = () => {
    const { httpRequest } = HttpService();

    const getObjects = async (search: object): Promise<IObjectsResponse> => new Promise((resolve, reject) => {
        httpRequest<IObjectsResponse>(
            "GET",
            "",
            {},
            search
        )
            .then(resolve)
            .then(reject)
    });

    return { getObjects }
}

export default ObjectService;