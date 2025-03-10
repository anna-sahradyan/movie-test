import React from "react";
import { Link } from "react-router-dom";
import  style from './header.module.scss';

export const Header: React.FC = () => {
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
                    <li><Link to="/" className={style.navLink}>Главная</Link></li>
                    <li><Link to="#" className={style.navLink}>Фильмы</Link></li>
                </ul>
            </nav>
            </div>
        </header>
    );
};
