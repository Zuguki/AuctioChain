import $api from '../api.ts';
import { AxiosResponse } from 'axios';
import IProfile from '../interfaces/IProfile.ts';

export default class ProfileService {
    private static pathProfile: string = 'profiles';

    public static getMyProfile(): Promise<AxiosResponse<IProfile>> {
        return $api.get(this.pathProfile);
    }
}
