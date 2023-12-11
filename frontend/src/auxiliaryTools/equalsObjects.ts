const equalsObjects = <T>(...obj: T[]): boolean => {
    const idolOdj: string = JSON.stringify(obj[0]);
    return obj.every((el: T): boolean => idolOdj === JSON.stringify(el));
};

export default equalsObjects;
