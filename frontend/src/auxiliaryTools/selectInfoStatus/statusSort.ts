import SelectsOption from "@/hooks/useSelectAuctions/ISelectsOption.ts";

export const statusSort: SelectsOption[] = [
    {
        element: "A–Z",
        value: 0,
    },
    {
        element: "Z–A",
        value: 1,
    },
    {
        element: "Дате начала аукциона",
        value: 2,
    },
    {
        element: "Дате конца аукциона",
        value: 3,
    },
];
