import { useState, useEffect, useCallback } from 'react'
import { add, fetchData, TrendingMovieData } from 'movies-api-pack'

function App(): JSX.Element {
  const [movies, setMovies] = useState<TrendingMovieData[]>([]) //initializing the state variable as an empty array

  const fetchTrending = useCallback(async (signal: AbortController['signal']): Promise<void> => {
    const data = await fetchData(window.envVars.apiKey, signal)
    console.log('DATA', data)
    // fetching data from API in JSON Format
    setMovies(data.results) //storing that data in the state
  }, [])
  console.log('ADD', add(1, 2))
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    if (!movies.length) {
      console.log('fetching')
      console.log('envVariables', window.envVars.apiKey)

      fetchTrending(signal) //calling the fetchTrending function only during the initial rendering of the app.
    }
    return () => {
      abortController.abort()
    }
  }, [movies, fetchTrending])

  console.log('state', movies)
  const img_300 = 'https://image.tmdb.org/t/p/w300'

  return (
    <>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        {movies.length &&
          movies.map((movie) => {
            return <img key={movie.title} src={`${img_300}/${movie.poster_path}`}></img>
          })}
      </div>
    </>
  )
}

export default App
