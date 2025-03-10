import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {getMovieDetails} from "../../redux/slices/thunks/thunk.ts";
import style from './movieDetail.module.scss';
import {Loading} from "../Loading/intex.tsx";

export const MovieDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {movieDetails: movieDetail, loading, error} = useAppSelector((state) => state.movies);
    const imageUrl = movieDetail?.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`
        : '/clip.jpg';

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetails(Number(id)));
        }
    }, [dispatch, id]);

    if (loading === "pending") {
        return <p><Loading/></p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div className={style.movieDetail}>
            {movieDetail && (
                <div className={'container'}>
                    <img
                        src={imageUrl}
                        alt={movieDetail.title}
                    />
                    <h1>{movieDetail.title}</h1>
                    <p>{movieDetail.overview}</p>
                    <p>Дата выхода: {movieDetail.release_date}</p>
                    <p>Рейтинг: {movieDetail.vote_average}</p>
                    <p>Жанры: {movieDetail.genres?.map((genre) => genre.name).join(", ")}</p>
                </div>
            )}
        </div>
    );
};
