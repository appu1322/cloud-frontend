import "./style.scss";
import { useEffect, useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import imageIcon from '../../assets/images/image.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useAppSelector } from "../../redux";
import useObject from "../../hooks/useObject";
import { formatMimetype } from "../../utilities/helper";

const TrackUpload = () => {
  const [expand, setExpand] = useState(true);
  const { upload, addObject } = useObject();
  const objects = useAppSelector(state => state.objectSlice);

  const initiateUpload = async () => {
    for await (const object of objects.files) {
      if (object.status === "INQUEUE") {
        const uploadedObject = await upload(object.id, object.file);
        if (uploadedObject) {
          const payload = {
            originalName: object.file.name,
            sizeInByte: object.file.size,
            originalType: object.file.type,
            parentId: objects.parentId,
            extension: formatMimetype(object.file.type),
            originalPath: uploadedObject.data.originalPath,
            thumbnailPath: uploadedObject.data.thumbnailPath,
          }
          await addObject(object.id, payload);
        }
      }
    }
  }

  useEffect(() => {
    initiateUpload();
  }, [objects]);

  return (
    <div className="custom-snakebar">
      <div className="header">
        <Typography variant="body1">{3} Upload Completed</Typography>
        <div>
          <IconButton onClick={() => setExpand(!expand)}>
            {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className="body" style={{ maxHeight: expand ? "350px" : "0px" }}>
        {
          objects.files.map((file, i) => {
            return <div className="content-wrapper" key={i}>
              <div className="center">
                <img src={imageIcon} width="20px" />
                <div className="ml-2 title">{file.file.name}</div>
              </div>
              {
                file.status === "COMPLETED" ?
                  <CheckCircleIcon color="success" />
                  :
                  <HourglassBottomIcon color="warning" />
              }
            </div>
          })
        }

      </div>
    </div>
  )
}

export default TrackUpload