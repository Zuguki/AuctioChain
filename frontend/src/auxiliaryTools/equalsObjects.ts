const equalsObjects = (...obj: never[]): boolean => {
    const idolOdj: string = JSON.stringify(obj[0]);

    for (const el of obj) {
        if (JSON.stringify(el) !== idolOdj) {
            return false;
        }
    }
    return true;
}

export default equalsObjects;