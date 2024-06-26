import "./style.scss"
import { Grid } from '@mui/material'
import { FC } from 'react';
import pdfIcon from '../../assets/images/pdf.svg';
import fileIcon from '../../assets/images/file.png';
import imageIcon from '../../assets/images/image.svg';
import { formatMimetype } from "../../utilities/helper";

interface IProps {
    id: string | number
    mimeType: string
    title: string
    active?: boolean
    previewUrl: string
    onClick: (id: number | string) => void
}

const ContentCard: FC<IProps> = ({ id, mimeType, title, active, previewUrl, onClick }) => {

    const getLogo = (mime: string) => {
        const type = formatMimetype(mime);
        switch (type) {
            case "images": return imageIcon
            case "documents": return pdfIcon
            default: return fileIcon
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} onClick={() => onClick(id)} >
            <div className='file-card' style={{ backgroundColor: active ? "#d4e7ff" : undefined }} onMouseDown={e => console.log(e)}>
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
        </Grid>
    )
}

export default ContentCard