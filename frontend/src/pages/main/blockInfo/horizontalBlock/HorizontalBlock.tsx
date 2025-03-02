import { FC } from "react";
import IBlockInfo from "@/pages/main/blockInfo/IBlockInfo.ts";
import styles from "./horizontalBlock.module.scss";

const HorizontalBlock: FC<IBlockInfo> = ({ title, description, animation }) => {
    return (
        <div data-aos={animation} className={styles.block}>
            <h3 className={styles.title}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default HorizontalBlock;
