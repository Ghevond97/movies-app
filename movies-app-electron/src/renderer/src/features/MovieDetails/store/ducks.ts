import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MovieDetails, fetchDetails } from 'movies-api-pack'

export const fetchMovieDetails = createAsyncThunk<MovieDetails, string, { rejectValue: string }>(
  'trending/fetchMovieDetails',
  async (id: string, thunkApi) => {
    try {
      const { data, statusCode } = await fetchDetails(window.envVars.apiKey, id)
      if (statusCode === 404) {
        return thunkApi.rejectWithValue('failed to fetch movie details')
      }

      return data
    } catch {
      return thunkApi.rejectWithValue('failed to fetch movie details')
    }
  }
)
export interface MovieDetailsInitialState {
  data: MovieDetails | null
  loading: boolean
  error: string | null
}

const initialState: MovieDetailsInitialState = {
  data: null,
  loading: false,
  error: null
}

export const movieDetailsSlice = createSlice({
  name: 'movies/details',
  initialState,
  reducers: {
    resetMovieDetails: (state) => {
      state.data = initialState.data
      state.loading = initialState.loading
      state.error = initialState.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  }
})
export const { resetMovieDetails } = movieDetailsSlice.actions
export default movieDetailsSlice.reducer
