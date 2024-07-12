import "./style.scss";
import { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import imageIcon from '../../assets/images/image.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useAppDispatch, useAppSelector, updateUploadStatus, updateUploadFiles, updateExportFile } from "../../redux";
import useObject from "../../hooks/useObject";
import { formatMimetype } from "../../utilities/helper";
import WarningDialog from "../mui/warning-dialog";
import useScreenSize from "../../hooks/useScreenSize";
import { useLazyExportProgressQuery } from "../../services";

const TrackUpload = () => {
  const dispatch = useAppDispatch();
  const screenSize = useScreenSize();
  const { upload, addObject } = useObject();
  const [expand, setExpand] = useState(true);
  const [isClose, setIsClose] = useState(true);
  const [warning, setWarning] = useState(false);
  const [exportProgressTraking, setExportProgressTraking] = useState(false);
  const objectDetail = useAppSelector(state => state.objectSlice);
  const uploadObject = useAppSelector(state => state.objectSlice.upload);
  const exportObject = useAppSelector(state => state.objectSlice.export);
  const [getExportProgress, { data }] = useLazyExportProgressQuery({ pollingInterval: exportProgressTraking ? 3000 : 0 });
  const completedObject = uploadObject.files.filter(ele => ele.status === "COMPLETED");


  const initiateUpload = async () => {
    for await (const object of uploadObject.files) {
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
    const totalFiles = uploadObject.files.length;
    if (totalFiles && totalFiles !== completedObject.length && uploadObject.status !== "PROGRESS") {
      setIsClose(false);
      dispatch(updateUploadStatus("PROGRESS"));
      initiateUpload();
    }
  }, [uploadObject.files, uploadObject.status]);

  useEffect(() => {
    const exportIds = exportObject.filter(ele => ele.status === "INITIATED").map(ele => ele._id);
    if (exportObject.length && exportIds && !exportProgressTraking) {
      setIsClose(false);
      setExportProgressTraking(true);
      getExportProgress({ _ids: exportIds });
    } else {
      setExportProgressTraking(false);
    }
  }, [exportObject]);

  useEffect(() => {
    if (data && data.data) {
      data.data.forEach(ele => {
        dispatch(updateExportFile(ele));
      });
    }
  }, [data]);

  const onclose = () => {
    const uploadInProgress = uploadObject.status === "PROGRESS" && uploadObject.files.length !== completedObject.length;

    if (uploadInProgress || exportProgressTraking) {
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
          exportObject.map((file, i) => {
            return <div className="content-wrapper" key={i}>
              <div className="center">
                <img src={imageIcon} width="20px" />
                <div className="ml-2 title">{file.name}</div>
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
        {
          uploadObject.files.map((file, i) => {
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