const sliceText = (text: string, indexSlice: number): string => {
    if (text.split('').length > indexSlice) {
        return text.split('').slice(0, indexSlice).join('') + '...';
    }
    return text;
};

export default sliceText;
