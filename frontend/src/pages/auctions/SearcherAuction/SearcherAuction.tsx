import React, { useContext, useEffect, useState } from "react";
import styleSearcher from "./searcherAuction.module.css";
import { Form, useSearchParams } from "react-router-dom";
import Hr from "@/components/UI/Hr/Hr.tsx";
import SearchInput from "@/components/UI/inputs/SearchInput/SearchInput.tsx";
import { Context } from "@/context/context.ts";
import useSearchInput from "@/hooks/useSearchInput.ts";
import IParamsAuctions, {
    baseParamsAuctions,
} from "@/interfaces/IParamsAuctions.ts";
import BaseSelect from "@/components/UI/BaseSelect/BaseSelect.tsx";
import useChangeSelect from "@/hooks/useSelectAuctions/useChangeSelect.ts";
import { statusSort } from "@/auxiliaryTools/selectInfoStatus/statusSort.ts";
import { statusFilter } from "@/auxiliaryTools/selectInfoStatus/statusFilter.ts";
import { setDefaultValue } from "@/auxiliaryTools/defaultSelectValue/setDefaultValue.ts";

const SearcherAuction = () => {
    const { stateApp } = useContext(Context);
    const [searchParams] = useSearchParams();

    const [paramsFilter, setParamsFilter] = useState<IParamsAuctions>({
        search: searchParams.get("search") || "",
        auctionStatus: Number(searchParams.get("auctionStatus")) || null,
        orderByStatus: Number(searchParams.get("orderByStatus")) || null,
    });

    console.log(Number(searchParams.get("auctionStatus")));
    const { isWrite, changeSearch } = useSearchInput(setParamsFilter);

    const { changeSelect: changeFilter } =
        useChangeSelect<IParamsAuctions>(setParamsFilter);

    const { changeSelect: changeSort } =
        useChangeSelect<IParamsAuctions>(setParamsFilter);

    useEffect(() => {
        stateApp.paramsAuctions = paramsFilter;

        return () => {
            stateApp.paramsAuctions = baseParamsAuctions;
        };
    }, [paramsFilter]);

    return (
        <Form>
            <h4 className={styleSearcher.title}>Поиск</h4>
            <SearchInput
                name="search"
                width="large"
                autoFocus={true}
                autoComplete="off"
                changeValue={changeSearch}
                error={null}
                errorBlur={() => ({})}
                isWrite={isWrite}
                defaultValue={paramsFilter.search}
            />
            <div className={styleSearcher.selects}>
                <BaseSelect
                    title="Сортировать по:"
                    name="orderByStatus"
                    selectors={statusSort}
                    changeValue={changeSort}
                    defaultValue={
                        setDefaultValue(statusSort, paramsFilter.orderByStatus)
                            ?.value
                    }
                />
                <BaseSelect
                    title="Фильтровать по статусу:"
                    name="auctionStatus"
                    selectors={statusFilter}
                    changeValue={changeFilter}
                    defaultValue={
                        setDefaultValue(
                            statusFilter,
                            paramsFilter.auctionStatus,
                        )?.value
                    }
                />
            </div>
            <Hr width="large" />
        </Form>
    );
};

export default SearcherAuction;
