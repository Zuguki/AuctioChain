import React, { ReactElement, useEffect, useState } from 'react';
import stylePagination from './pagination.module.css';
import { numberArray } from '../../../auxiliaryTools/numberArray.ts';
import ButtonPage from './ButtonPage.tsx';
import ButtonSwipeUp from './ButtonSwipes/ButtonSwipeUp.tsx';
import ButtonSwipeBack from './ButtonSwipes/ButtonSwipeBack.tsx';

const Pagination = ({ endPage, currentPage, sendCurrentPage }) => {
    const [paginationArray, setPaginationArray] = useState(
        numberArray(currentPage, endPage),
    );

    useEffect(() => {
        sendCurrentPage(currentPage);
        setPaginationArray(():  => numberArray(currentPage, endPage));
    }, [currentPage]);
    if (endPage <= 1) {
        return null;
    }
    return (
        <div className={stylePagination.position}>
            <ButtonSwipeBack
                currentPage={currentPage}
                setCurrentPage={sendCurrentPage}
            />
            {paginationArray.map(
                (el: '...' | number): ReactElement => (
                    <ButtonPage
                        current={el === currentPage}
                        key={el}
                        value={el}
                        sendCurrentPage={sendCurrentPage}
                    >
                        {el}
                    </ButtonPage>
                ),
            )}
            <ButtonSwipeUp
                currentPage={currentPage}
                setCurrentPage={sendCurrentPage}
                endPage={endPage}
            />
        </div>
    );
};
export default Pagination;
