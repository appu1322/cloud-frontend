import "./style.scss"
import { Grid } from '@mui/material'
import { FC } from 'react'

interface IProps {
    id: string | number
    logo: JSX.Element
    title: string
    active?: boolean
    onClick: (id: number | string) => void
}

const ContentCard:FC<IProps> = ({ id, logo, title, active, onClick }) => {
    return (
        <Grid item xs={6} md={4} lg={3} xl={2} onClick={() => onClick(id) } >
            <div className='file-card' style={{backgroundColor: active ? "#d4e7ff" : undefined}}>
                <div className="header">
                    <div className='mr-3'>{logo}</div>
                    <div className="title">{title}</div>
                </div>
                <div className="preview">
                    preview
                </div>
            </div>
        </Grid>
    )
}

export default ContentCard