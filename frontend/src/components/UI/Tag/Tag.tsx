import {FC, useEffect, useState} from 'react';
import tagStyle from './tag.module.css'

interface ITag {
    children: string,
    isClick?: boolean,

}
const Tag: FC<ITag> = ({ children, isClick = false }) => {
    const textTag = '#' + children.replace(/\s+/g, '_');

    // hook
    const [style, setStyle] = useState<string>(tagStyle.tag);
    const [onActive, setOnActive] = useState<boolean>(false);
    useEffect(() => {
        if (onActive) {
            setStyle((prevStyle: string): string => `${prevStyle} ${tagStyle.activeTag}`);
            return;
        }
        setStyle((): string => tagStyle.tag);
    }, [onActive]);

    return (
        <div
            className={style} onClick={() => {
                if (!isClick) return;
                console.log('style')
                setOnActive((prevOnActive: boolean) => !prevOnActive);
            }}>
            {textTag}
        </div>
    );
};

export default Tag;