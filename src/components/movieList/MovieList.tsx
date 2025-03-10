import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {setCurrentPage} from "../../redux/slices/movieSlice.ts";
import {searchMovies, fetchPopular} from "../../redux/slices/thunks/thunk.ts";
import {PaginationComponent} from "../paginationComponent/PaginationComponent.tsx";
import {FormSearch} from "../search/FormSearch.tsx";
import {MovieCard} from "../card/MovieCard.tsx";
import style from './movieList.module.scss';
import {Loading} from "../Loading/intex.tsx";

export const MovieList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {movies, loading, error, searchTerm, totalPages, currentPage} = useAppSelector(
        (state) => state.movies
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setCurrentPage(newPage));
        } else {
            console.log("Невозможно перейти на страницу: страница вне диапазона");
        }
    };

    useEffect(() => {
        if (!searchTerm) {
            dispatch(fetchPopular(currentPage));
        }
    }, [dispatch, currentPage, searchTerm]);

    useEffect(() => {
        if (searchTerm) {

            dispatch(searchMovies({searchTerm, page: 1}));
        }
    }, [dispatch, searchTerm]);

    return (
        <div className={style.movieListContainer}>
            <FormSearch/>
            {loading === "pending" && <p><Loading/></p>}
            {error && <p>Ошибка: {error}</p>}

            <div className={style.mob}>
                {movies.length === 0 && !loading && (
                    <p className={style.error}>Нет фильмов для отображения.</p>
                )}

                <div className={style.movieList}>
                    {movies.length > 0 && movies.slice(0, 6).map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </div>

            <PaginationComponent
                totalItems={totalPages * 10}
                itemsPerPage={10}
                currentPage={currentPage}
                onPageChange={(_, page) => handlePageChange(page)}
            />
        </div>
    );
};
