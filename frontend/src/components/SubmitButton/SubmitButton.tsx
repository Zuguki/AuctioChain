import { FC } from "react";
import BaseButton from "../UI/BaseButton/BaseButton.tsx";
import IBaseButton from "../UI/BaseButton/IBaseButton.ts";
import styleSubmitForm from "./submitForm.module.css";

interface ISubmitButton extends IBaseButton {
    loading: boolean;
}

const SubmitButton: FC<ISubmitButton> = ({ loading, children, ...props }) => {
    return (
        <div className={styleSubmitForm.pos}>
            <BaseButton type="submit" disabled={loading} {...props}>
                {children}
            </BaseButton>
            {loading && (
                <div className={styleSubmitForm.positionLoading}>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmitButton;
