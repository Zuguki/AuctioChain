import {ReactNode} from "react";

type IObjCard<T extends IBaseCard> = Pick<T, 'name' | 'image' | 'description' | 'id'>;
type IPropsCardDiv<T extends IBaseCard> = { objCard: IObjCard<T>, children: ReactNode};

interface IBaseCard {
    name: string;
    image: string;
    description: string;
    id: string;
}

export {
    type IPropsCardDiv,
    type IBaseCard,
    type IObjCard
}