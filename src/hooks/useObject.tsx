import { ChangeEvent } from "react";
import { useAddFolderMutation, useAddObjectMutation } from "../services"
import { useAppDispatch } from "../redux";
import { updateFileStatus, updateFiles } from "../redux/slices/objectSlice";
import { IObjectFile } from "../interfaces";
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

    const addFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length) {
            const modifiedFiles: IObjectFile[] = Array.from(files).map((file, i) => ({ id: i + 1, file, status: "INQUEUE" }))
            dispatch(updateFiles(modifiedFiles));
        }
    }

    const upload = async (id: number, file: File) => {
        try {
            const form = new FormData()
            form.append("file", file)
            const uplaodedFile = await httpFormRequest(form);
            console.log({ uplaodedFile });
        } catch (error) {
            dispatch(updateFileStatus({ id, status: "FAILDED" }));
            console.log({ error });
        }
    }

    const addObject = async (id: number, payload: object) => {
        try {
            const object = await objectMutation(payload);
            dispatch(updateFileStatus({ id, status: "COMPLETED" }));
            console.log({ object });
        } catch (error) {
            dispatch(updateFileStatus({ id, status: "FAILDED" }));
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