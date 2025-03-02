import { AxiosResponse } from "axios";

interface ILogicFormDivButton {
    textButton: string;
    logicClick: () => Promise<AxiosResponse>;
}

export default ILogicFormDivButton;
