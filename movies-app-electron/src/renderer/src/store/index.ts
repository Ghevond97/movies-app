import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import trendingMoviesReducer from '../features/TrendingMovies/store/ducks'

export const store = configureStore({
  reducer: {
    trending: trendingMoviesReducer
  },
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
