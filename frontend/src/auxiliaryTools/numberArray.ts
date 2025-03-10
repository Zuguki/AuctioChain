const POINTS: IPoints = "...";
type IPoints = "...";

const numberArray = (
    start: number,
    end: number,
    step: number = 1,
): (IPoints | number)[] => {
    const result: number[] = [];

    if (end - start > 3) return [start, start + 1, POINTS, end];

    for (let i = start; i <= end; i += step) {
        result.push(i);
    }

    while (result.length < 4) {
        if (result[0] === 1) break;
        result.unshift(result[0] - 1);
    }

    return result;
};

export { numberArray };
