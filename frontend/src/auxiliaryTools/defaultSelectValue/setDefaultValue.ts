export const setDefaultValue = <Option extends { value: number }, T>(
    options: Option[],
    value: T,
): Option | null => {
    const option = options.find((el) => el.value === value);

    return option ?? null;
};
