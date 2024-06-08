import './style.scss';
import useSnackbar from '../../hooks/useSnackbar';
import { Button, Typography } from '@mui/material';
import InputFileUpload from '../../components/mui/file-upload';
import { ChangeEvent, useState } from 'react';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomTable from '../../components/mui/table';
import HttpService from '../../services/http';

const columns = [
  {
    id: "id",
    label: "S No.",
  },
  {
    id: "fileName",
    label: "File Name",
  },
  {
    id: "status",
    label: "Status",
  },
]

interface data {
  id: number;
  fileName: string;
  status: string | JSX.Element; 
}[]

interface IState{
  id: number,
  file: File,
  status: string
}

const Home = () => {
  let rows: data[] = [];
  const [state, setState] = useState<IState[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const { snackbar } = useSnackbar();
  const { httpFormRequest } = HttpService();

  const onInputUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log({files});
    
    if (files && files.length) {
      const modifiedFiles = Array.from(files).map((file, i) => ({ id: i, file, status: "Ready for upload" }) )
      setState(modifiedFiles);
      snackbar(`${files.length > 1 ? "Files" : "file"} are ready to upload`, "info")
    }
  }

  const onSubmit = async() => {
    try {
      setIsPending(true)
      for await (const data of state) {
        if( data.status !== "Uploaded" ){
          const form = new FormData()
          form.append("file", data.file)
          await httpFormRequest(form);
          const upoaded = { ...data, status: "Uploaded" }
          setState(prev=> {
            return prev.map((file, i) => i === data.id ? upoaded : file)
          })
        }
      }
      setIsPending(false)
      snackbar("Files uploaded successfully", "info")
    } catch (error) {
      setError(JSON.stringify(error))
      console.log({error});
      // snackbar("", "")
    }

  }

  const createRow = (index: number, state: IState) => {
    return {
      id: index,
      fileName: state.file.name,
      status: state.status ===  "Ready for upload" ? <HourglassTopIcon color="warning" /> : <CheckCircleOutlineIcon color="success" />
    };
  };

  if (state.length) {
    rows = state.map((ele, i) => createRow(i + 1, ele));
  }

  return (
    <div className="px-3">
      <Typography className="mt-3 center" variant="h4">Legendary Cloud</Typography>

      <div>
        <InputFileUpload multiple onChange={onInputUpload} />
        <Button className='ml-2' variant="contained" disabled={(!state?.length || isPending) ? true : false} onClick={onSubmit}>Upload</Button>
        { isPending && <div className='ml-2'>Loading...</div>}
      </div>

      <div className='my-3'>
        <CustomTable
          columns={columns}
          rows={rows}
          height={450}
          isEditable
        />
      </div>

      { error.length ? <div>{error}</div> : ""}
    </div>
  )
}

export default Home