import "./style.scss";
import { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import imageIcon from '../../assets/images/image.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useAppDispatch, useAppSelector, updateUploadStatus, updateUploadFiles } from "../../redux";
import useObject from "../../hooks/useObject";
import { formatMimetype } from "../../utilities/helper";
import WarningDialog from "../mui/warning-dialog";
import useScreenSize from "../../hooks/useScreenSize";

const TrackUpload = () => {
  const screenSize = useScreenSize();
  const [expand, setExpand] = useState(true);
  const [isClose, setIsClose] = useState(true);
  const [warning, setWarning] = useState(false);
  const { upload, addObject } = useObject();
  const objectDetail = useAppSelector(state => state.objectSlice);
  const objects = useAppSelector(state => state.objectSlice.upload);
  const dispatch = useAppDispatch();
  const completedObject = objects.files.filter(ele => ele.status === "COMPLETED");


  const initiateUpload = async () => {
    for await (const object of objects.files) {
      if (object.status === "INQUEUE") {
        const uploadedObject = await upload(object.id, object.file);
        if (uploadedObject) {
          const payload = {
            originalName: object.file.name,
            sizeInByte: object.file.size,
            originalType: object.file.type,
            parentId: objectDetail.parentId,
            extension: formatMimetype(object.file.type),
            originalPath: uploadedObject.data.originalPath,
            thumbnailPath: uploadedObject.data.thumbnailPath
          }
          await addObject(object.id, payload);
        }
      }
    }

    dispatch(updateUploadStatus("COMPLETED"));
  }

  useEffect(() => {
    const totalFiles = objects.files.length;
    if (totalFiles && totalFiles !== completedObject.length && objects.status !== "PROGRESS") {
      setIsClose(false);
      dispatch(updateUploadStatus("PROGRESS"));
      initiateUpload();
    }
  }, [objects.files, objects.status]);

  const onclose = () => {
    if (objects.status === "PROGRESS" && objects.files.length !== completedObject.length) {
      setWarning(true);
    } else {
      setIsClose(true);
      dispatch(updateUploadFiles([]));
    }
  }

  return (
    <div className="custom-snakebar" style={{ display: (isClose || screenSize.width < 768) ? "none" : "initial" }}>
      <div className="header">
        <Typography variant="body1">{completedObject.length} Upload Completed</Typography>
        <div>
          <IconButton onClick={() => setExpand(!expand)}>
            {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          <IconButton onClick={onclose}>
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

      <WarningDialog
        isOpen={warning}
        onClose={() => setWarning(false)}
        onConfirm={() => setWarning(false)}
        title="Uploading still in progress"
        description="Do you want cancelling uploading"
      />
    </div>
  )
}

export default TrackUpload