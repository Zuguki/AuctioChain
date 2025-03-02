const roundNumber = (num: number, countMainNumbers: number = 2) =>
    Math.round(num * Math.pow(10, countMainNumbers)) /
    Math.pow(10, countMainNumbers);

const isNaN = (value: number): number => (Number.isNaN(value) ? 0 : value);

export { isNaN, roundNumber };
