import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {searchMovies, getMovieDetails, fetchPopular} from "./thunks/thunk";
import {MoviesState} from "./thunks/types.ts";

const initialState: MoviesState = {
    movies: [],
    movieDetails: null,
    loading: 'idle',
    error: null,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            console.log("movieSlice: setSearchTerm reducer, searchTerm = ", action.payload); //DEBUG
            state.searchTerm = action.payload;
            state.currentPage = 1; // Reset to first page on new search
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Произошла неизвестная ошибка.';
                state.movies = [];
                state.totalPages = 1;
                state.totalResults = 0;
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.movieDetails = action.payload;
            })
            .addCase(getMovieDetails.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Произошла неизвестная ошибка при получении деталей фильма.';
            })
            .addCase(fetchPopular.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchPopular.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.totalResults = action.payload.total_results;
            })
            .addCase(fetchPopular.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Произошла неизвестная ошибка при загрузке популярных фильмов.';
                state.movies = [];
                state.totalPages = 1;
                state.totalResults = 0;
            });
    },
});

export const {setSearchTerm, setCurrentPage} = moviesSlice.actions;
export default moviesSlice.reducer;
