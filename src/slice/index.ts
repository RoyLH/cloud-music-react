import {
  addListener,
  configureStore,
  createListenerMiddleware,
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import reducer from './reducer'

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
})

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export type AppAddListener = TypedAddListener<RootState, AppDispatch>

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening
export const addAppListener = addListener as AppAddListener

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
