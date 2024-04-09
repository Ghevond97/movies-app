export function add(a: number, b: number): number {
  return a + b;
}

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
