import { useEffect, useState } from "react";
import tagStyle from "./tag.module.css";

interface IUseTag {
    style: string;
    changeActive: () => void;
}

const useTag = (): IUseTag => {
    const [style, setStyle] = useState<string>(tagStyle.tag);
    const [onActive, setOnActive] = useState<boolean>(false);

    const changeActive = (): void =>
        setOnActive((prevOnActive: boolean): boolean => !prevOnActive);

    useEffect((): void => {
        if (onActive) {
            setStyle(
                (prevStyle: string): string =>
                    `${prevStyle} ${tagStyle.activeTag}`,
            );
            return;
        }
        setStyle((): string => tagStyle.tag);
    }, [onActive]);

    return { style, changeActive };
};

export default useTag;
