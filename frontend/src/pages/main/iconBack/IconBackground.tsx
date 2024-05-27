import styles from "./iconBack.module.scss";
import { FC } from "react";
import backgroundColor from "../../../../public/bacgroundIcons (1).svg";

const IconBackground: FC = () => {
    return (
        <div className={styles.position}>
            <img className={styles.img} src={backgroundColor} alt={"ssdds"} />
        </div>
    );
};

export default IconBackground;
