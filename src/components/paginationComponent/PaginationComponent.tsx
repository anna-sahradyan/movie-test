import React from 'react';
import { Pagination } from '@mui/material';
import style from './pagination.module.scss';

interface PaginationComponentProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
                                                                            totalItems,
                                                                            itemsPerPage,
                                                                            currentPage,
                                                                            onPageChange,
                                                                        }) => {
    // Проверка на наличие элементов
    if (totalItems === 0) {
        return null;
    }

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(event, page);
    };
    const showArrows = pageCount > 1;

    return (
        <Pagination
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '8px',
                '& .MuiPaginationItem-root': {
                    color: 'inherit',
                    border: '1px solid var(--blue-200)',
                    backgroundColor: 'inherit',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'var(--blue-200)',
                    },
                },
                '@media (max-width: 375px)': {
                    paddingBottom: '0',
                },
            }}
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
            renderItem={(item) => {
                if (item.type === 'page' && item.page === 1) {
                    return (
                        <button
                            key="firstPage"
                            className={`${style.paginationButton} ${
                                currentPage === 1 ? style.activePage : ''
                            }`}
                            onClick={(e) => handlePageChange(e as React.ChangeEvent<unknown>, 1)}
                        >
                            1
                        </button>
                    );
                }

                if (item.type === 'page' && item.page === currentPage && currentPage !== 1) {
                    return (
                        <button
                            key={item.page}
                            className={`${style.paginationButton} ${style.activePage}`}
                        >
                            {item.page}
                        </button>
                    );
                }

                if (item.type === 'previous' && showArrows) {
                    return (
                        <button
                            key="prev"
                            className={`${style.paginationButton}`}
                            onClick={(e) =>
                                handlePageChange(e as React.ChangeEvent<unknown>, Math.max(currentPage - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            {'<'}
                        </button>
                    );
                }

                if (item.type === 'next' && showArrows) {
                    return (
                        <button
                            key="next"
                            className={`${style.paginationButton}`}
                            onClick={(e) =>
                                handlePageChange(e as React.ChangeEvent<unknown>, Math.min(currentPage + 1, pageCount))
                            }
                            disabled={currentPage === pageCount}
                        >
                            {'>'}
                        </button>
                    );
                }

                return null;
            }}
        />
    );
};
