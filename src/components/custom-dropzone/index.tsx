import { FC, ReactNode, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  children: ReactNode
  height: string,
  onScroll?: () => void
}

const CustomDropzone: FC<IProps> = ({ children, height, onScroll }) => {
  const listInnerRef = useRef<HTMLDivElement | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop: (acceptFiles) => {
      console.log({ acceptFiles });
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
          <div>Drop the files here ...</div> :
          <div className='h-100' style={{ overflow: "auto" }} onScroll={onScrollPage} ref={listInnerRef}>
            {children}
          </div>
      }
    </div>
  )
}

export default CustomDropzone