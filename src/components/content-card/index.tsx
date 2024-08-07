import "./style.scss"
import { Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

import pdfIcon from '../../assets/images/pdf.svg';
import fileIcon from '../../assets/images/file.png';
import imageIcon from '../../assets/images/image.svg';
import videIcon from '../../assets/images/video.svg';
import { formatMimetype } from "../../utilities/helper";
import { useAppDispatch, useAppSelector, updateSelectedFiles } from "../../redux";

interface IProps {
    id: string
    mimeType: string
    title: string
    active?: boolean
    previewUrl?: string
    varient?: "NORMAL" | "UPLOAD"
}

const ContentCard: FC<IProps> = ({ id, mimeType, title, previewUrl, varient }) => {
    const isUploading = varient=== "UPLOAD";
    const selectedFiles = useAppSelector(state => state.objectSlice.selectedFiles);
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        shiftPressing: false,
    });

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.repeat) {
            return
        }
        setState(prev => ({ ...prev, shiftPressing: true }))
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) {
            return
        }
        setState(prev => ({ ...prev, shiftPressing: false }))
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyUp);
        window.addEventListener("keyup", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyUp);
            window.removeEventListener("keyup", onKeyDown);
        }
    }, []);

    const onSelect = (id: string) => {
        if (selectedFiles.includes(id) && state.shiftPressing) {
            const files = selectedFiles.filter(ele => ele !== id);
            dispatch(updateSelectedFiles(files));
        } else if (selectedFiles.includes(id)) {
            dispatch(updateSelectedFiles(selectedFiles.length > 1 ? [id] : []));
        } else if (state.shiftPressing) {
            dispatch(updateSelectedFiles([...selectedFiles, id]));
        } else {
            dispatch(updateSelectedFiles([id]));
        }
    }

    const getLogo = (mime: string) => {
        const type = formatMimetype(mime);
        switch (type) {
            case "images": return imageIcon
            case "documents": return pdfIcon
            case "videos": return videIcon
            default: return fileIcon
        }
    }


    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} onClick={() => !isUploading && onSelect(id)} >
            <div className='file-card' style={{ backgroundColor: selectedFiles.includes(id) ? "#d4e7ff" : undefined, opacity: isUploading ? "0.7" : undefined }}>
                <div className="header">
                    <div className='mr-2 center'> <img width={14} src={getLogo(mimeType)} /> </div>
                    <div className="title">{title}</div>
                </div>
                <div className="preview">
                    {
                        previewUrl
                            ?
                            <img className="w-100 h-100" src={previewUrl} />
                            :
                            ""
                    }
                </div>
            </div>
            { isUploading && <LinearProgress />}
        </Grid>
    )
}

export default ContentCard