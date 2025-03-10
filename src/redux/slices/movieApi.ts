const API_KEY = '5a1d8e69db05d411e5ecb7bc16dc8f94';
const BASE_URL = 'https://api.themoviedb.org/3';

import axios from 'axios';


export const fetchMovies = async (searchTerm: string, page: number = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: searchTerm,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies');
    }
};

export const fetchPopularMovies = async (page: number = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch popular movies');
    }
};

export const fetchMovieDetails = async (movieId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movie details');
    }
};
