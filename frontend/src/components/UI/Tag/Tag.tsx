import { FC } from 'react';
import useTag from './useTag.ts';

interface ITag {
    children: string;
    isClick?: boolean;
}

const Tag: FC<ITag> = ({ children, isClick = false }) => {
    const textTag = '#' + children.replace(/\s+/g, '_');

    // hook
    const { style, changeActive } = useTag();

    return (
        <div
            className={style}
            onClick={() => {
                if (!isClick) return;
                console.log('style');
                changeActive();
            }}
        >
            {textTag}
        </div>
    );
};

export default Tag;
