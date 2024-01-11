import { ChangeEvent, useCallback, useState } from 'react';

const useDataUser = <T>() => {
    const [dataUser, setDataUser] = useState<T>({} as T);
    const logicFormValue = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            const { value, name } = e.target;
            setDataUser(
                (prevDataUser: T): T => ({ ...prevDataUser, [name]: value }),
            );
        },
        [],
    );
    return { dataUser, logicFormValue };
};

export default useDataUser;
