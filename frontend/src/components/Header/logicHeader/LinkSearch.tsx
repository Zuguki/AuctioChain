import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "@/context/context.ts";
import styleLink from "../../UI/CustomLink/customLink.module.css";
import { observer } from "mobx-react-lite";
import PathApp from "@/routes/pathApp/PathApp.ts";

const LinkSearch = observer(() => {
    const { stateApp } = useContext(Context);
    const location = useLocation();
    const isSearch = stateApp.search;

    const clickLink = (): void => {
        if (location.pathname !== PathApp.auctions) {
            stateApp.search = true;
            return;
        }
        stateApp.search = !isSearch;
    };

    return (
        <Link
            className={`${styleLink.link} ${
                isSearch &&
                location.pathname === PathApp.auctions &&
                styleLink.active
            }`}
            to={PathApp.auctions}
            onClick={clickLink}
        >
            Поиск
        </Link>
    );
});

export default LinkSearch;
