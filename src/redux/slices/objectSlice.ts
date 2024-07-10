import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IObjectFile } from '../../interfaces';

interface IObjectState {
  path: string;
  parentId: string;
  upload: {
    files: Array<IObjectFile>,
    status: "PROGRESS" | "COMPLETED"
  },
  export: {
    files: Array<string>
  }

}

const initialState: IObjectState = {
  path: "/",
  parentId: "root",
  upload: {
    files: [],
    status: "COMPLETED"
  },
  export: {
    files: []
  }
}

export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    updatePath: (state, action: PayloadAction<{ path: string, parentId: string }>) => {
      return { ...state, ...action.payload }
    },

    // Upload Methods 
    updateUploadStatus: (state, action: PayloadAction<"PROGRESS" | "COMPLETED">) => {
      return { ...state, upload: { ...state.upload, status: action.payload } }
    },

    updateUploadFiles: (state, action: PayloadAction<IObjectFile[]>) => {
      return { ...state, upload: { ...state.upload, files: action.payload.length ? [...state.upload.files, ...action.payload] : [] } }
    },

    updateUploadFileStatus: (state, action: PayloadAction<{ id: number | string, status: "INPROGRESS" | "COMPLETED" | "FAILDED" }>) => {
      const data = state.upload.files.map(file => {
        if (file.id === action.payload.id) {
          return { ...file, status: action.payload.status }
        }
        return file;
      })
      return { ...state, upload: { ...state.upload, files: data } }
    },

    // Export Methods 
    updateExportFiles: (state, action: PayloadAction<string[]>) => {
      return { ...state, export: { ...state.export, files: action.payload } }
    }
  },
})

export const { updateUploadStatus, updatePath, updateUploadFiles, updateUploadFileStatus, updateExportFiles } = objectSlice.actions;

export default objectSlice.reducer;