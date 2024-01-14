import { FC, ReactElement, Suspense } from 'react';
import Spinner from '../components/UI/Spinner/Spinner.tsx';

const LazyDownload: FC<{ children: ReactElement }> = ({ children }) => {
    return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default LazyDownload;
