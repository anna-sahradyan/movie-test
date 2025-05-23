import React, {useState, useEffect} from "react";
import {useAppDispatch} from "../../redux/store.ts";
import {setSearchTerm} from "../../redux/slices/movieSlice.ts";
import {searchMovies} from "../../redux/slices/thunks/thunk.ts";
import style from './search.module.scss';
import {Search} from "../../assets/icons/Search.tsx";

export const FormSearch: React.FC = () => {
    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed) {
            const timeout = setTimeout(() => {
                dispatch(setSearchTerm(trimmed));
                dispatch(searchMovies({searchTerm: trimmed, page: 1}));
            }, 500); // debounce — 500ms

            return () => clearTimeout(timeout); // отмена предыдущего таймера при новом вводе
        }
    }, [query, dispatch]);

    const handleSearch = () => {
        const trimmed = query.trim();
        if (trimmed) {
            dispatch(setSearchTerm(trimmed));
            dispatch(searchMovies({searchTerm: trimmed, page: 1}));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={style.movieSearch}>
            <input
                className={style.inputField}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск фильмов..."
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className={style.icon}><Search/></button>
        </div>
    );
};
