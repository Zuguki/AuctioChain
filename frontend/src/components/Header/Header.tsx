import { FC, memo } from "react";
import styleHeader from "./header.module.css";
import LinksHeaders from "./logicHeader/LinksHeaders.tsx";
import "../../App.css";

const Header: FC = memo(() => {
    return (
        <header className={`${styleHeader.header} noSelect`}>
            <LinksHeaders />
        </header>
    );
});

export default Header;
