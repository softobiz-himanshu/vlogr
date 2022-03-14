import { combineReducers } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { elementsReducer } from './slices/elements/reducer'
import { uploadsReducer } from './slices/uploads/reducer'
import { PersistConfig } from 'redux-persist/es/types'
import { fontsReducer } from './slices/fonts/reducer'
import { templatesReducer } from './slices/templates/reducer'
import { creationsReducer } from './slices/creations/reducer'
import { authReducer, AuthState } from './slices/auth/reducer'
import { itemMenuReducer } from './slices/item-menu/reducer'
import { timelineReducer } from './slices/timeline/reducer'

const elementsPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  editor: combineReducers({
    elements: elementsReducer,
    uploads: uploadsReducer,
    fonts: fontsReducer,
    templates: templatesReducer,
  }),
  creations: creationsReducer,
  auth: persistReducer(elementsPersistConfig, authReducer),
  ui: combineReducers({
    itemMenu: itemMenuReducer
  }),
  timeline: timelineReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
