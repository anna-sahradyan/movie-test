import React from "react";
import {Link, useNavigate} from "react-router-dom";
import  style from './header.module.scss';
import {useAppDispatch} from "../../redux/store.ts";
import {fetchPopular} from "../../redux/slices/thunks/thunk.ts";
import {setCurrentPage, setSearchTerm} from "../../redux/slices/movieSlice.ts";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickFilms = () => {
        dispatch(setSearchTerm(''));
        dispatch(setCurrentPage(1));
        dispatch(fetchPopular(1));
        navigate('/');
    };
    return (
        <header className={style.header}>
            <div className = {style.inner}>
            <div className={style.logo}>
                <Link to="/" className={style.logoLink}>
                    MovieFinder
                </Link>
            </div>
            <nav className={style.nav}>
                <ul>
                    <li><Link to="/" className={style.navLink} >Главная</Link></li>
                    <li><Link to="#" className={style.navLink} onClick={handleClickFilms}>Фильмы</Link></li>
                </ul>
            </nav>
            </div>
        </header>
    );
};
