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

  if (trendingMovies.loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="container mx-auto">
        <SearchInput onchange={handleInputChange} value={searchTerm} />
        <div className="flex flex-wrap -mx-4 ml-0">
          {trendingMovies.searchedMovies.length > 0 && trendingMovies.searchTerm !== ''
            ? trendingMovies.searchedMovies.map((movie) => {
                return (
                  <div key={movie.id} className="w-1/3 px-4 mb-4">
                    <Card
                      imgUrl={`${img_300}/${movie.poster_path}`}
                      title={movie.title || movie.name}
                      id={movie.id}
                    />
                  </div>
                )
              })
            : trendingMovies.data.length &&
              trendingMovies.data.map((movie) => {
                return (
                  <div key={movie.id} className="w-1/3 px-4 mb-4">
                    <Card
                      imgUrl={`${img_300}/${movie.poster_path}`}
                      title={movie.title || movie.name}
                      id={movie.id}
                    />
                  </div>
                )
              })}
        </div>
      </div>
    </>
  )
}

export default TrendingMoviesPage
