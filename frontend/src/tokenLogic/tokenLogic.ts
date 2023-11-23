import IUser from "../authorizationLogic/IUser.ts";

export default class TokenLogic {
    public static readonly TOKEN: string = 'token';
    public static readonly REFRESH_TOKEN: string = 'refreshToken';

    private static getUserToAtob(atobUser: any): IUser {
        return {
            name: atobUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            email: atobUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            userId: atobUser.userId
        }
    }

    public static convertTokenToUser(token: string): IUser {
       return this.getUserToAtob(JSON.parse(atob(token.split('.')[1])));
    }
}