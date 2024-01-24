import { ChangeEvent, useCallback, useState } from 'react';

const useDataUser = <T>(baseData: T = {} as T) => {
    const [dataUser, setDataUser] = useState<T>(baseData);
    const logicFormValue = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            const { value, name } = e.target;
            setDataUser(
                (prevDataUser: T): T => ({ ...prevDataUser, [name]: value }),
            );
        },
        [],
    );
    return { dataUser, setDataUser, logicFormValue };
};

export default useDataUser;
