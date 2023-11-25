import React, {
    ButtonHTMLAttributes,
    FC,
    LegacyRef,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import stylePagination from './pagination.module.css';
import { numberArray } from '../../../auxiliaryTools/numberArray.ts';
const Pagination = ({ endPage, sendCurrentPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationArray, setPaginationArray] = useState(
        numberArray(currentPage, endPage),
    );
    const refButtonPage = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        // send pagination page
        sendCurrentPage(currentPage);
        /*scroll(0,0);*/
        setPaginationArray(() => numberArray(currentPage, endPage));
    }, [currentPage]);

    return (
        <div className={stylePagination.position}>
            <ButtonSwipe
                back
                onClick={() => {
                    if (currentPage == 1) return;
                    setCurrentPage(prevState => prevState - 1);
                }}
            ></ButtonSwipe>
            {paginationArray.map(
                (el: '...' | number): ReactElement => (
                    <ButtonPage
                        current={el === currentPage}
                        key={el}
                        value={el}
                        onClick={e => {
                            if (e.target.value === '...') return;
                            setCurrentPage(() => Number(e.target.value));
                        }}
                    >
                        {el}
                    </ButtonPage>
                ),
            )}
            <ButtonSwipe
                onClick={() => {
                    console.log(refButtonPage.current);
                    if (currentPage == endPage) return;
                    setCurrentPage(prevState => prevState + 1);
                }}
            ></ButtonSwipe>
        </div>
    );
};

const ButtonSwipe: FC<IButtonSwipe> = ({ back = false, ...props }) => {
    return (
        <button
            className={`${stylePagination.btnSwipe} ${
                back && stylePagination.btnSwipeBack
            }`}
            {...props}
        ></button>
    );
};

const ButtonPage: FC<IButtonPage> = ({ children, current, ...props }) => {
    const style = `${stylePagination.number} ${
        current && stylePagination.currentNumber
    }`;
    return (
        <div>
            <button
                /*ref={refEl}*/
                className={style}
                {...props}
            >
                {children}
            </button>
            {current && <div className={stylePagination.line}></div>}
        </div>
    );
};

interface IButtonSwipe extends ButtonHTMLAttributes<HTMLButtonElement> {
    back?: boolean;
}

interface IButtonPage extends ButtonHTMLAttributes<HTMLButtonElement> {
    current?: boolean;
    children: number | '...';
}
export default Pagination;
