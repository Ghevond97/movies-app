import { FunctionComponent, useEffect, useMemo, useCallback } from 'react'
import { useAppDispatch, RootState, AppDispatch } from '../../../store'
import { useSelector } from 'react-redux'
import { fetchTrendingMovies } from '../store/ducks'
import Spinner from '@renderer/shared/components/Spinner'
import Card from '@renderer/shared/components/Card'
import SearchInput from '@renderer/shared/components/SearchInput'
import { setSearchTerm, fetchSearchedMovies } from '@renderer/features/TrendingMovies/store/ducks'
import { debounce } from 'lodash' // Import debounce function from lodash

const TrendingMoviesPage: FunctionComponent = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const trendingMovies = useSelector((state: RootState) => state.trending)
  const searchTerm = useSelector((state: RootState) => state.trending.searchTerm)

  const fetchSearchedMoviesDebounced = useMemo(
    () => debounce(() => dispatch(fetchSearchedMovies()), 500),
    [dispatch]
  )

  const handleInputChange = useCallback(
    (term) => {
      dispatch(setSearchTerm(term))
      if (term !== '') {
        fetchSearchedMoviesDebounced()
      }
    },
    [dispatch, fetchSearchedMoviesDebounced]
  )

  useEffect(() => {
    if (!trendingMovies.data.length && !trendingMovies.error && !trendingMovies.loading) {
      dispatch(fetchTrendingMovies())
    }
  }, [dispatch, trendingMovies])

  const img_300 = 'https://image.tmdb.org/t/p/w300'

  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="pt-4 pb-4">
          <SearchInput onchange={handleInputChange} value={searchTerm} />
        </div>

        {/* Display loading spinner if data is loading */}
        {trendingMovies.loading && (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}

        {/* Display movie cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* If there are searched movies, render them */}
          {trendingMovies.searchedMovies.map((movie) => (
            <div key={movie.id}>
              <Card
                imgUrl={
                  movie.poster_path || movie.backdrop_path
                    ? `${img_300}/${movie.poster_path || movie.backdrop_path}`
                    : 'https://www.freeiconspng.com/uploads/no-image-icon-6.png'
                }
                title={movie.title || movie.name}
                id={movie.id}
              />
            </div>
          ))}
          {/* If there are no search results and no search term, render trending movies */}
          {!searchTerm &&
            trendingMovies.data.map((movie) => (
              <div key={movie.id}>
                <Card
                  imgUrl={`${img_300}/${movie.poster_path}`}
                  title={movie.title || movie.name}
                  id={movie.id}
                />
              </div>
            ))}
        </div>

        {/* Display "no data" message if there is a search term but no search results */}
        {!trendingMovies.loading &&
          searchTerm !== '' &&
          trendingMovies.searchedMovies.length === 0 && (
            <div className="h-full flex justify-center items-center align-middle">
              <p className="text-center text-gray-500">No movies found for "{searchTerm}".</p>
            </div>
          )}

        {/* Display "no trending movies" message if there are no trending movies */}
        {!trendingMovies.loading && !searchTerm && trendingMovies.data.length === 0 && (
          <div className="flex justify-center items-center h-full align-middle">
            <p className="text-center text-gray-500">No trending movies found.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default TrendingMoviesPage
