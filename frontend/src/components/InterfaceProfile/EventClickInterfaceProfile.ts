import { MouseEvent } from "react";

/*interface EventClickInterfaceProfile extends MouseEvent<HTMLDivElement> {
    _isClickInterfaceProfile?: boolean;
}

export default EventClickInterfaceProfile;*/

export type EventClickInterfaceProfile<T = undefined> = MouseEvent<T> & {
    _isClickInterfaceProfile?: boolean;
};
