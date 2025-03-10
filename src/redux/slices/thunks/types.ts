export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
    release_date: string;
    genre_ids?: number[];
}

export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    genres: { id: number; name: string }[];
    release_date: string;
    vote_average: number;
    runtime: number | null;
    status: string;
}

export interface MoviesState {
    movies: Movie[];
    movieDetails: MovieDetails | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    searchTerm: string;
    currentPage: number;
    totalPages: number;
    totalResults: number;
}

export interface FetchMoviesParams {
    searchTerm: string;
    page: number;
}
