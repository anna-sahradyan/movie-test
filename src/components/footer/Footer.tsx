import React from "react";
import style from './footer.module.scss';

export const Footer: React.FC = () => {
    return (
        <footer className={style.footer}>
            <div className = {style.inner}>
                <p>&copy; 2025 MovieFinder. Все права защищены.</p></div>
        </footer>
    );
};
