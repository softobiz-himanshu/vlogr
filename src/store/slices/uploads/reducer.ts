import { IUpload, Uploading } from '@/interfaces/editor'
import { createReducer, current } from '@reduxjs/toolkit'
import { closeUploading, setDeleteUpload, setUploading, setUploads } from './actions'

export interface UploadsState {
  uploads: IUpload[]
  uploading: Uploading | null
}

const initialState: UploadsState = {
  uploads: [],
  uploading: null,
}

export const uploadsReducer = createReducer(initialState, builder => {
  builder.addCase(setUploads, (state, { payload }) => {
    state.uploads.unshift(...payload)
  })
  builder.addCase(setUploading, (state, { payload }) => {
    state.uploading = payload
  })
  builder.addCase(setDeleteUpload, (state, { payload }) => {
    const currentState = current(state)
    const filteredUploads = currentState.uploads.filter(upload => upload.id !== payload.id)
    state.uploads = filteredUploads
  })
  builder.addCase(closeUploading, state => {
    state.uploading = null
  })
})
