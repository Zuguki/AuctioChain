import React, { FC } from "react";
import styles from "./verticalBlock.module.scss";
import IBlockInfo from "@/pages/main/blockInfo/IBlockInfo.ts";

const VerticalBlock: FC<IBlockInfo> = ({ title, description, animation }) => {
    return (
        <div data-aos={animation} className={styles.block}>
            <h3 className={styles.title}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default VerticalBlock;
