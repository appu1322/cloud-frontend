import useLoader from "../../hooks/useLoader";
import axios, { AxiosError, AxiosProgressEvent } from "axios";

const HttpService = () => {
    const { setIsLoading } = useLoader();

    const httpRequest = <T>(
        method: "GET" | "POST" | "PUT" | "DELETE" | "OPTION",
        url: string,
        data = {},
        params = {},
    ) => new Promise<T>((resolve, reject) => {
        setIsLoading(() => true);
        axios({
            method,
            url: `${import.meta.env.VITE_BASE_URL}/${url}`,
            data,
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("currentUserToken") || ""}`
            }
        })
            .then((response) => {
                setIsLoading(() => false);
                resolve(response.data);
            })
            .catch((err) => {
                const error = err as AxiosError;
                setIsLoading(() => false);
                if (error.response?.status === 401) {
                    localStorage.removeItem("currentUserToken");
                }
                reject(err.response);
            });
    });

    const httpFormRequest = <T>(
        data: FormData,
    ) =>
        new Promise<T>((resolve, reject) => {
            axios(
                {
                    method: "POST",
                    url: `${import.meta.env.VITE_BASE_URL}/upload/`,
                    data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("currentUserToken") || ""}`
                    },
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        if (progressEvent.total) {
                            const progress = (progressEvent.loaded / progressEvent.total) * 50;
                            console.log("uploaded: ", { progress });

                        }
                    },
                    onDownloadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                            console.log("Download: ", { progress });
                        }
                    },
                }
            )

                .then((response) => {
                    setIsLoading(() => false);
                    resolve(response.data);
                })
                .catch((err) => {
                    const error = err as AxiosError;
                    setIsLoading(() => false);
                    if (error.response?.status === 401) {
                        localStorage.removeItem("currentUserToken");
                    }
                    reject(err.response);
                });
        });

    return { httpRequest, httpFormRequest };
};

export default HttpService;
