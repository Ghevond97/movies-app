import { FunctionComponent, useEffect } from 'react'

import { useAppDispatch, RootState, AppDispatch } from '../../../store'
import { useSelector } from 'react-redux'
import { fetchTrendingMovies } from '../store/ducks'
import Spinner from '@renderer/shared/components/Spinner'
import Card from '@renderer/shared/components/Card'

const TrendingMoviesPage: FunctionComponent = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const trendingMovies = useSelector((state: RootState) => state.trending)

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
        <div className="flex flex-wrap -mx-4">
          {trendingMovies.data.length &&
            trendingMovies.data.map((movie) => {
              return (
                <div key={movie.id} className="w-1/3 px-4 mb-4">
                  <Card
                    imgUrl={`${img_300}/${movie.poster_path}`}
                    title={movie.title || movie.name}
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
