import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface CardProps {
  imgUrl: string
  title: string
  id: number
}

const Card: FunctionComponent<CardProps> = ({ imgUrl, title, id }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="block aspect-w-16 aspect-h-9">
        <div
          className="bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'cover', // Ensures the image covers the entire element
            backgroundPosition: 'center', // Centers the image
            paddingBottom: '56.25%' // Maintains the aspect ratio (16:9)
          }}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
            title={title}
          >
            {title}
          </h5>
        </a>
        <Link
          to={`/movie/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default Card
