import IUser from '../../../API/interfaces/IUser.ts';

export interface ILinkLogicUser {
    auth: boolean;
    user: IUser;
}

export default ILinkLogicUser;
