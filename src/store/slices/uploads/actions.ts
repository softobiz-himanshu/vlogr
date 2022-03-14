import { IUpload, Uploading } from '@/interfaces/editor'
import { uniqueFilename } from '@/utils/unique'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import api from '@services/api'
import axios, { AxiosError } from 'axios'
import mime from "mime/lite"

export const setUploads = createAction<IUpload[]>('uploads/setUploads')
export const setUploading = createAction<Uploading>('uploads/setUploading')
export const closeUploading = createAction('uploads/closeUploading')
export const setDeleteUpload = createAction<{ id: string }>('uploads/setDeleteUpload')

export const getUploads = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  'uploads/getUploads',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const uploads = await api.getUploads()
      dispatch(setUploads(uploads))
    } catch (err) {
      return rejectWithValue((err as AxiosError).response?.data?.error.data || null)
    }
  }
)

export const deleteUpload = createAsyncThunk<void, { id: string }, { rejectValue: Record<string, string[]> }>(
  'uploads/deleteUpload',
  async (args, { rejectWithValue, dispatch }) => {
    try {
      // const uploads = await api.getUploads()
      await api.deleteUpload(args.id)
      dispatch(setDeleteUpload({ id: args.id }))
    } catch (err) {
      return rejectWithValue((err as AxiosError).response?.data?.error.data || null)
    }
  }
)

export const uploadFile = createAsyncThunk<void, { file: File, previewName?: string }, any>(
  'uploads/uploadFile',
  async (args, { dispatch }) => {
    dispatch(
      setUploading({
        progress: 0,
        status: 'IN_PROGRESS',
      })
    )
    const file = args.file;
    const previewName = args.previewName
    const updatedFileName = uniqueFilename(file.name)
    const updatedFile = new File([file], updatedFileName)
    const response = await api.getSignedURLForUpload({ name: updatedFileName })
    await axios.put(response.url, updatedFile, {
      headers: { 'Content-Type': mime.getType(file.name) },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        dispatch(
          setUploading({
            progress: percentCompleted,
            status: 'IN_PROGRESS',
          })
        )
      },
    })
    const uploadedFile = await api.updateUploadFile({ name: updatedFileName, previewName })
    dispatch(closeUploading())
    dispatch(setUploads([uploadedFile]))
  }
)
