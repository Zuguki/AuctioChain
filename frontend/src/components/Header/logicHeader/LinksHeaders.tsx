import { FC, memo } from "react";
import CustomLink from "../../UI/CustomLink/CustomLink.tsx";
import { Link } from "react-router-dom";
import logo from "../../../design/logo.svg";
import LinkUser from "./LinkUser.tsx";
import LinkSearch from "./LinkSearch.tsx";
import PathApp from "../../../routes/pathApp/PathApp.ts";
import fox from "../../../design/metamask-fox.jpg";
import styleHeader from "../header.module.scss";
import { TYPE_DEVICE } from "@/auxiliaryTools/defineTypeDevice.ts";
import menu from "../../../design/menu.svg";

const LinksHeaders: FC = memo(() => {
    if (TYPE_DEVICE === "mobile") {
        return (
            <ul>
                <li>
                    <img src={menu} alt="menu" />
                </li>

                <li>
                    <Link to="/">
                        <img
                            src={logo}
                            className={styleHeader.mobileTitle}
                            alt="logo"
                        />
                    </Link>
                </li>
                <li>
                    <LinkUser />
                </li>
            </ul>
        );
    }
    return (
        <ul>
            <li>
                <CustomLink to={PathApp.auctions}>Аукционы</CustomLink>
            </li>
            <li>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div className={styleHeader.fox}>
                    <img src={fox} width="30" height={30} alt="fox" />
                </div>
            </li>
            <li>
                <LinkSearch />
            </li>
            <li>
                <CustomLink to={PathApp.currency}>Курс валют</CustomLink>
            </li>
            <li>
                <LinkUser />
            </li>
        </ul>
    );
});

export default LinksHeaders;
