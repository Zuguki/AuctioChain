import React, { FC, ReactElement } from 'react';
import Spinner from '../UI/Spinner/Spinner.tsx';

interface ILogicDownload {
    isLoading: boolean;
    children: ReactElement;
}

const LogicDownload: FC<ILogicDownload> = ({ isLoading, children }) => {
    return <>{isLoading ? <Spinner /> : children}</>;
};

export default LogicDownload;
