interface PostRegistrationUser {
    email: string;
    userName: string;
    password: string;
    passwordConfirm: string;
}

export const isPostRegistrationUser = (
    obj: any,
): obj is PostRegistrationUser => {
    return obj.passwordConfirm !== undefined;
};

export default PostRegistrationUser;
