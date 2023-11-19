interface IUser {
    email: string,
    userName: string,
    password: string
}

type PostLoginUser = Omit<IUser, 'email' | 'userName'> & {login : string};

type PostRegistrationUser = IUser & {passwordConfirm: string};

export {
    type IUser,
    type PostLoginUser,
    type PostRegistrationUser
}