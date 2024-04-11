import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TrendingMoviesPage from './features/TrendingMovies/containers/TrendingMoviesPage'
import MovieDetailsPage from './features/MovieDetails/containers/MovieDetailsPage'

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TrendingMoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
