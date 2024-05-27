import { FC, ReactNode } from "react";
import Spinner from "../UI/Spinner/Spinner.tsx";
import { AxiosError } from "axios";
import styleLogicForm from "./logicFormProcessing.module.css";

interface ILogicFormProcessing {
    loading: boolean;
    err: AxiosError | null;
    centerText?: boolean;
}

const LogicFormProcessing: FC<ILogicFormProcessing> = ({
    loading,
    centerText = false,
    err,
}) => {
    const error = (): ReactNode => {
        const resError: unknown = err?.response?.data;
        if (
            typeof resError === "object" &&
            resError &&
            "errors" in resError &&
            resError.errors
        ) {
            return (
                <>
                    {Object.values(resError.errors).map((message: unknown) => {
                        if (Array.isArray(message))
                            return (
                                <p
                                    className={styleLogicForm.error}
                                    key={String(message)}
                                >
                                    {String(message[0])}
                                </p>
                            );
                    })}
                </>
            );
        }
        if (typeof resError === "string") {
            return <p className={styleLogicForm.error}>{resError}</p>;
        }
        return <p className={styleLogicForm.error}>{err?.message}</p>;
    };
    return (
        <div className={centerText ? styleLogicForm.position : ""}>
            {loading && <Spinner form={true} />}
            {err && error()}
        </div>
    );
};

export default LogicFormProcessing;
