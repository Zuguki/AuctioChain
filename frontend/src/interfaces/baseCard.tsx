import { ReactNode } from 'react';

type IObjCard<T extends IBaseCard> = Pick<
    T,
    'name' | 'image' | 'description' | 'id' | 'status'
>;
type IPropsCardDiv<T extends IBaseCard> = {
    objCard: IObjCard<T>;
    children: ReactNode;
};

interface IBaseCard {
    name: string;
    image: string;
    description: string;
    id: string;
    status?: number;
}

export { type IPropsCardDiv, type IBaseCard, type IObjCard };
