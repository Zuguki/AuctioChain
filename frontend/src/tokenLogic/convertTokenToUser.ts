import {IUser} from "../authorizationLogic/IUser.ts";

const getUserToAtob = (atobUser: any): IUser  => {
    return {
        name: atobUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: atobUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        userId: atobUser.userId
    }
}

const convertTokenToUser = (token: string): IUser => getUserToAtob(JSON.parse(atob(token.split('.')[1])));

export default convertTokenToUser;