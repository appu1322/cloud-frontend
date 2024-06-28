import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./style.scss";

const TrackUpload = () => {

  return (
    <div className="custom-snakebar">
      <div className="header">
        <Typography variant="body1">{3} Upload Completed</Typography>
        <div>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className="body">
        hi
      </div>
    </div>
  )
}

export default TrackUpload