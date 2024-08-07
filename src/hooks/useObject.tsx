import { useAddFolderMutation, useAddObjectMutation } from "../services"
import { useAppDispatch, updateUploadFileStatus, updateUploadFiles } from "../redux";
import { IObjectFile, IUploadResponse } from "../interfaces";
import HttpService from "../services/http";


const useObject = () => {
    const dispatch = useAppDispatch();
    const { httpFormRequest } = HttpService();
    const [objectMutation] = useAddObjectMutation();
    const [folderMutation] = useAddFolderMutation();


    const addNewFolder = async (name: string) => {
        try {
            const object = await folderMutation({ originalName: name, isFolder: true });
            console.log({ object });
        } catch (error) {
            console.log({ error });
        }
    }

    const addFiles = async (files: FileList | null) => {
        if (files && files.length) {
            const modifiedFiles: IObjectFile[] = Array.from(files).map((file) => ({ id: file.name.toLowerCase(), file, status: "INQUEUE" }))
            dispatch(updateUploadFiles(modifiedFiles));
        }
    }

    const upload = async (id: number | string, file: File) => {
        try {
            const form = new FormData()
            form.append("file", file)
            const uplaodedFile = await httpFormRequest<IUploadResponse>(form);
            return uplaodedFile;
        } catch (error) {
            dispatch(updateUploadFileStatus({ id, status: "FAILDED" }));
            console.log({ error });
        }
    }

    const addObject = async (id: number | string, payload: object) => {
        try {
            await objectMutation(payload);
            dispatch(updateUploadFileStatus({ id, status: "COMPLETED" }));
        } catch (error) {
            dispatch(updateUploadFileStatus({ id, status: "FAILDED" }));
            console.log({ error });
        }
    }

    return {
        addNewFolder,
        addFiles,
        upload,
        addObject
    }
}

export default useObject;