import { useState, useEffect, useCallback } from 'react'

function App(): JSX.Element {
  const [movies, setMovies] = useState([]) //initializing the state variable as an empty array

  const fetchTrending = useCallback(async (signal: AbortController['signal']): Promise<void> => {
    const data = await fetch(
      `
    https://api.themoviedb.org/3/trending/all/day?api_key=${window.envVars.apiKey}`,
      { signal }
    )
    const dataJ = await data.json() // fetching data from API in JSON Format
    setMovies(dataJ.results) //storing that data in the state
  }, [])

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
