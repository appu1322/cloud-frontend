import "./style..scss";
import { Typography } from '@mui/material';
import { FC, ReactNode, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useObject from "../../hooks/useObject";

interface IProps {
  children: ReactNode
  height: string,
  onScroll?: () => void
}

const CustomDropzone: FC<IProps> = ({ children, height, onScroll }) => {
  const { addFiles } = useObject();
  const listInnerRef = useRef<HTMLDivElement | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: (acceptFiles) => {
      const list = acceptFiles as unknown as FileList;
      addFiles(list);
    }
  })

  const onScrollPage = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && onScroll) {
        onScroll();
      }
    }
  };

  return (
    <div {...getRootProps()} className='w-100' style={{ height }}>
      <input {...getInputProps()} />

      {
        isDragActive ?
          <div className='center drop-wrapper'>
            <CloudUploadIcon fontSize="large" color='primary' />
            <Typography variant='h5'>Drop File</Typography>
            <Typography variant='caption'> Drop the files here ...</Typography>
          </div> :
          <div className='h-100' style={{ overflow: "auto" }} onScroll={onScrollPage} ref={listInnerRef}>
            {children}
          </div>
      }
    </div>
  )
}

export default CustomDropzone