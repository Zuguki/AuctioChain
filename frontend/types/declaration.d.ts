import "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: AxiosError;
    }
}

declare module "*.module.scss" {
    interface IClassNames {
        [classname: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module "*.module.css" {
    interface IClassNames {
        [classname: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
