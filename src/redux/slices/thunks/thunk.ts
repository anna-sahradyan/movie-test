import { createAsyncThunk } from "@reduxjs/toolkit";
import {FetchMoviesParams, Movie, MovieDetails} from "./types.ts";
import {fetchMovieDetails, fetchMovies, fetchPopularMovies} from "../movieApi.ts";


export const searchMovies = createAsyncThunk<
    { results: Movie[]; total_pages: number; total_results: number },
    FetchMoviesParams,
    { rejectValue: string }
>(
    'movies/searchMovies',
    async ({ searchTerm, page }: FetchMoviesParams, { rejectWithValue }) => {
        try {
            const response = await fetchMovies(searchTerm, page);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла ошибка при поиске фильмов.');
        }
    }
);

// thunk.ts
export const fetchPopular = createAsyncThunk<
    { results: Movie[]; total_pages: number; total_results: number },
    number,
    { rejectValue: string }
>(
    'movies/fetchPopular',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await fetchPopularMovies(page);
            return response;
        } catch (error: any) {
            console.error("Error in fetchPopular:", error);
            return rejectWithValue(error.message || 'Ошибка при загрузке популярных фильмов');
        }
    }
);


export const getMovieDetails = createAsyncThunk<
    MovieDetails,
    number,
    { rejectValue: string }
>(
    'movies/getMovieDetails',
    async (movieId: number, { rejectWithValue }) => {
        try {
            const response = await fetchMovieDetails(movieId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла ошибка при получении деталей фильма.');
        }
    }
);
