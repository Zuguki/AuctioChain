import React from 'react';
import styleNotification from './notificationOperation.module.css';

const NotificationOperation = () => {
    return (
        <div className={styleNotification.modal}>
            <p>Транзакция обрабатывается!</p>
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default NotificationOperation;
