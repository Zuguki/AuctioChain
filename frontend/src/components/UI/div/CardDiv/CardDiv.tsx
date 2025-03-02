import { ReactElement, SyntheticEvent } from "react";
import styleCard from "./cardDiv.module.css";
import ButtonCard from "./ButtonCard/ButtonCard.tsx";
import { Link, useLocation } from "react-router-dom";
import { IBaseCard, IPropsCardDiv } from "@/interfaces/BaseCard.ts";
import PathApp from "../../../../routes/pathApp/PathApp.ts";
import defaultImage from "../../../../design/not image.svg";
import sliceText from "@/auxiliaryTools/sliceText.ts";
import { urlImg } from "@/auxiliaryTools/urlImg.ts";

function CardDiv<T extends IBaseCard>({
    objCard,
    children,
}: IPropsCardDiv<T>): ReactElement {
    const { image, id, status, name } = objCard;
    let { description } = objCard;
    const path: string = status ? PathApp.auction : PathApp.lot;
    description = sliceText(description, 60);
    const location = useLocation();

    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>{name}</h5>
            <img
                className={styleCard.img}
                src={urlImg(image)}
                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultImage;
                    e.currentTarget.style.objectFit = "none";
                }}
                alt={name}
            />
            {children}
            <p className={styleCard.description}>{description}</p>
            <Link to={`${path}/${id}`} state={{ from: location }}>
                <ButtonCard>Открыть</ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;
