import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TrendingMovieData, fetchData } from 'movies-api-pack'

export const fetchTrendingMovies = createAsyncThunk<
  TrendingMovieData[],
  void,
  { rejectValue: string }
>('trending/fetchTrendingMovies', async (_, thunkAPI) => {
  try {
    const response = await fetchData(window.envVars.apiKey, thunkAPI.signal)
    const data = response.results
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch trending movies')
  }
})

export interface TrendingMoviesInitialState {
  data: TrendingMovieData[]
  loading: boolean
  error: string | null
}

const initialState: TrendingMoviesInitialState = {
  data: [],
  loading: false,
  error: null
}

export const trendingMoviesSlice = createSlice({
  name: 'movies/trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export default trendingMoviesSlice.reducer
