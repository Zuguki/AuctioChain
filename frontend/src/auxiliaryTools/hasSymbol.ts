const hasUppercase = (str: string): boolean => str.match(/[A-Z]/) !== null;

const hasNumber = (str: string): boolean =>  /\d/.test(str);

export {hasUppercase, hasNumber};
