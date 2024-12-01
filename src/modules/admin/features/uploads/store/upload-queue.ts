import { createListenerMiddleware } from '@reduxjs/toolkit'
import { uploadActions } from './upload-slice'
import { uploadVideo } from './upload-thunk'

export const uploadQueue = createListenerMiddleware()

uploadQueue.startListening({
  actionCreator: uploadActions.addUpload,
  effect: async (action, store) => {
    await store.dispatch(uploadVideo(action.payload))
  }
})
