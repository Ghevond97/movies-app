import { FunctionComponent, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, RootState, AppDispatch } from '../../../store'
import { fetchMovieDetails, resetMovieDetails } from '../store/ducks'
import { useSelector } from 'react-redux'
import Spinner from '@renderer/shared/components/Spinner'
import { Link } from 'react-router-dom'

const MovieDetailsPage: FunctionComponent = () => {
  const { id } = useParams() // Retrieve the movie ID from the URL parameter
  const dispatch: AppDispatch = useAppDispatch()
  const { data, loading, error } = useSelector((state: RootState) => state.details)
  const img_300 = 'https://image.tmdb.org/t/p/w300'
  useEffect(() => {
    if (id && !error && !loading && !data) {
      dispatch(fetchMovieDetails(id))
    }
  }, [dispatch, id, error, loading, data])

  const resetDetails = useCallback(() => {
    dispatch(resetMovieDetails())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={error || !data ? 'relative h-screen' : 'relative'}>
      <Link
        onClick={resetDetails}
        to="/"
        className="fixed top-0 left-0 mt-6 ml-6 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 z-10"
      >
        Back to Movies
      </Link>
      <div className=" h-full flex justify-center align-middle items-center">
        {error || !data ? (
          <div className="max-w-4xl mx-auto dark:bg-gray-800 border border-gray-200 rounded-lg shadow-lg p-8 dark:border-gray-700 mt-8 flex h-fit">
            <p className="text-red-600">
              Oops! Looks like there is no info available for this movie. Please go back to the main
              page and check out something else.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto dark:bg-gray-800 border border-gray-200 rounded-lg shadow-lg p-8 dark:border-gray-700 mt-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                  src={`${img_300}/${data.poster_path}`}
                  alt={data.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold mb-2">{data.title}</h2>
                  <p className="mb-2">{data.overview}</p>
                  <div className="flex items-start flex-col">
                    <span className="text-lg font-bold mr-2">Keywords:</span>
                    <div className="flex flex-wrap mb-2">
                      {data.keywords?.keywords?.slice(0, 5).map((keyword) => (
                        <span
                          key={keyword.id}
                          className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-2 mb-2"
                        >
                          {keyword.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-2">Rating:</span>
                    <span className="">{data.vote_average}</span>
                  </div>
                </div>
                <div className="flex items-start flex-col">
                  <h3 className="text-xl font-bold mr-4">Actors:</h3>
                  <div className="flex flex-wrap">
                    {data.credits.cast.slice(0, 5).map((actor) => (
                      <span
                        key={actor.id}
                        className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-2 mb-2"
                      >
                        {actor.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full">
              <h3 className="text-xl font-bold mb-2">Reviews:</h3>
              {data.reviews.results.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4 mt-4 w-full">
                  <h4 className="text-lg font-semibold">{review.author_details.username}</h4>
                  <p className="">{review.content}</p>
                  <div className="flex items-center mt-2">
                    <span className="">Rating: {review.author_details.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default MovieDetailsPage
