import React, { FC } from 'react';
import styleNotification from './notificationOperation.module.css';

const ComponentNotification: FC<{
    title: string;
    text: string;
    loading?: boolean;
}> = ({ title, text, loading = false }) => {
    return (
        <div key={Math.random()} className={styleNotification.modal}>
            <div className={styleNotification.position}>
                <p className={styleNotification.title}>{title}</p>
                <p className={styleNotification.text}>{text}</p>
                {loading && (
                    <div className={styleNotification.positionLoading}>
                        <div
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                        >
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComponentNotification;
