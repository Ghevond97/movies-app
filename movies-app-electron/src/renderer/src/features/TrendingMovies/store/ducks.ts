import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TrendingMovieData, fetchData, fetchMoviesByKeyword } from 'movies-api-pack'

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

export const fetchSearchedMovies = createAsyncThunk<
  TrendingMovieData[],
  void,
  { rejectValue: string }
>('trending/fetchSearchedMovies', async (_, thunkAPI) => {
  try {
    const searchTerm = thunkAPI.getState().trending.searchTerm

    const response = await fetchMoviesByKeyword(window.envVars.apiKey, thunkAPI.signal, searchTerm)

    return response.results
  } catch {
    return thunkAPI.rejectWithValue('failed to fetch searched movies')
  }
})

export interface TrendingMoviesInitialState {
  data: TrendingMovieData[]
  loading: boolean
  error: string | null
  searchTerm: string
  searchedMovies: TrendingMovieData[]
}

const initialState: TrendingMoviesInitialState = {
  data: [],
  loading: false,
  error: null,
  searchTerm: '',
  searchedMovies: []
}

export const trendingMoviesSlice = createSlice({
  name: 'movies/trending',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    }
  },
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
      .addCase(fetchSearchedMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearchedMovies.fulfilled, (state, action) => {
        state.loading = false
        state.searchedMovies = action.payload
      })
      .addCase(fetchSearchedMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export const { setSearchTerm } = trendingMoviesSlice.actions
export default trendingMoviesSlice.reducer
