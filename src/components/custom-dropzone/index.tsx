import { FC, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  children: ReactNode
  height: string
}

const CustomDropzone: FC<IProps> = ({ children, height }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: (acceptFiles) => {
      console.log({ acceptFiles });
    }
  })

  return (
    <div {...getRootProps()} className='w-100' style={{ height }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div>Drop the files here ...</div> :
          <div className='h-100' style={{overflow:"auto"}}>
            {children}
          </div>
      }
    </div>
  )
}

export default CustomDropzone