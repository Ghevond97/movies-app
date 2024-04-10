interface TrendingMovieData {
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
interface ApiResponse {
    page: number;
    results: TrendingMovieData[];
    total_pages: number;
    total_results: number;
}
declare function fetchData(apiKey: string, signal: AbortController["signal"]): Promise<ApiResponse>;
declare function fetchMoviesByKeyword(apiKey: string, signal: AbortController["signal"], keyWord: string): Promise<ApiResponse>;

export { type TrendingMovieData, fetchData, fetchMoviesByKeyword };
