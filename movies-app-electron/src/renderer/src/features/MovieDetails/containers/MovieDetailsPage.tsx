import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetailsPage: FunctionComponent = () => {
  const { id } = useParams() // Retrieve the movie ID from the URL parameter

  return <div>movie details {id}</div>
}
export default MovieDetailsPage
