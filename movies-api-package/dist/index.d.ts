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
interface MovieDetails {
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
    genres: [{
        id: number;
        name: string;
    }];
    id: number;
    original_title: string;
    overview: string;
    title: string;
    vote_average: number;
    credits: {
        cast: [{
            id: number;
            name: string;
            character: string;
        }];
    };
    keywords: {
        keywords: [{
            id: number;
            name: string;
        }];
    };
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
declare function fetchData(apiKey: string, signal: AbortController["signal"]): Promise<ApiResponse>;
declare function fetchMoviesByKeyword(apiKey: string, signal: AbortController["signal"], keyWord: string): Promise<ApiResponse>;
declare function fetchDetails(apiKey: string, id: string): Promise<{
    data: MovieDetails;
    statusCode: number;
}>;

export { type MovieDetails, type TrendingMovieData, fetchData, fetchDetails, fetchMoviesByKeyword };
