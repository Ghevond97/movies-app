export interface TrendingMovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  belongs_to_collection: {
    id: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: [{ id: number; name: string }];
  id: number;
  original_title: string;
  overview: string;
  title: string;
  vote_average: number;
  credits: { cast: [{ id: number; name: string; character: string }] };
  keywords: { keywords: [{ id: number; name: string }] };
  reviews: {
    page: 1;
    results: [
      {
        author: string;
        author_details: {
          name: string;
          username: string;
          avatar_path: null | string;
          rating: number;
        };
        content: string;
        created_at: string;
        id: string;
        updated_at: string;
      }
    ];
  };
}
interface ApiResponse {
  page: number;
  results: TrendingMovieData[];
  total_pages: number;
  total_results: number;
}
export async function fetchData(
  apiKey: string,
  signal: AbortController["signal"]
): Promise<ApiResponse> {
  const response = await fetch(
    `
  https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    { signal }
  );

  const data = await response.json();
  return data;
}

export async function fetchMoviesByKeyword(
  apiKey: string,
  signal: AbortController["signal"],
  keyWord: string
): Promise<ApiResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${keyWord}&page=${1}&include_adult=false`,
    { signal }
  );
  const data = await response.json();
  return data;
}

export async function fetchDetails(
  apiKey: string,
  id: string
): Promise<{ data: MovieDetails; statusCode: number }> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits%2Ckeywords%2Creviews&language=en-US`
    );

    // Check if response is successful
    if (response.ok) {
      const data = await response.json();
      return { data, statusCode: response.status };
    } else {
      // If response is not successful, throw an error with status code
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("something wen wrong");
  }
}
