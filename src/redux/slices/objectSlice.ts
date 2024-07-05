import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IObjectFile } from '../../interfaces';

interface IObjectState {
  path: string;
  parentId: string;
  files: Array<IObjectFile>,
  status: "PROGRESS" | "COMPLETED"
}

const initialState: IObjectState = {
  path: "/",
  parentId: "root",
  files: [],
  status: "COMPLETED"
}

export const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    updateUploadStatus: (state, action: PayloadAction<"PROGRESS" | "COMPLETED">) => {
      return { ...state, status: action.payload }
    },

    updatePath: (state, action: PayloadAction<{ path: string, parentId: string }>) => {
      return { ...state, data: action.payload }
    },

    updateFiles: (state, action: PayloadAction<IObjectFile[]>) => {
      return { ...state, files: [...state.files, ...action.payload] }
    },

    updateFileStatus: (state, action: PayloadAction<{ id: number | string, status: "INPROGRESS" | "COMPLETED" | "FAILDED" }>) => {
      const data = state.files.map(file => {
        if (file.id === action.payload.id) {
          return { ...file, status: action.payload.status }
        }
        return file;
      })
      return { ...state, files: data }
    }
  },
})

export const { updateUploadStatus, updatePath, updateFiles, updateFileStatus } = objectSlice.actions;

export default objectSlice.reducer;