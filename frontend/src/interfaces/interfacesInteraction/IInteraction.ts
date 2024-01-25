import { AxiosError } from 'axios';
import { ChangeEvent } from 'react';
import IImageLogicForm from '../IImageLogicForm.ts';
import IComponentInteraction from './IComponentInteraction.ts';

interface IInteraction<T> {
    submitForm: () => Promise<void>;
    loading: boolean;
    error: AxiosError | null;
    logicFormValue: (e: ChangeEvent<HTMLInputElement>) => void;
    blurError: () => void;
    logicFileImage: IImageLogicForm;
    componentInteraction: IComponentInteraction<T>;
}

export default IInteraction;
