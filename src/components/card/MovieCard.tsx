import React from "react";
import { Movie } from "../../redux/slices/thunks/types.ts";
import { Link } from "react-router-dom";
import style from './card.module.scss';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : '/clip.jpg';
    return (
        <div key={movie.id} className={style.movieItem}>
            <Link to={`/movie/${movie.id}`} className={style.movieCardLink}>
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className={style.movieImage}
                />
                <div className={style.movieInfo}>
                    <h3 className={style.movieTitle}>{movie.title}</h3>
                    <p className={style.movieOverview}>{movie.overview}</p>
                    <p className={style.movieRating}>Рейтинг: {movie.vote_average}</p>
                </div>
            </Link>
        </div>
    );
};
