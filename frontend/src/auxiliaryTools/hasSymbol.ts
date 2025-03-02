export default class HasSymbol {
    public static hasUppercase = (str: string): boolean =>
        str.match(/[A-Z]/) !== null;
    public static hasNumber = (str: string): boolean => /\d/.test(str);
}
