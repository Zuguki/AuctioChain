import React, {
    FC,
    HTMLAttributes,
    ReactElement,
    useEffect,
    useState,
} from "react";
import IBet from "../../API/interfaces/IBet.ts";
import ProfileService from "../../API/service/ProfileService.ts";
import LogicDownload from "../../components/LogicDownload/LogicDownload.tsx";
import styleLot from "./pageLot.module.css";

interface IListBetsLot extends HTMLAttributes<HTMLDivElement> {
    betsLot: IBet[];
}

const ListBetsLot: FC<IListBetsLot> = ({ betsLot, ...props }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ReactElement | ReactElement[] | null>(
        null,
    );
    useEffect((): void => {
        (async () => {
            setLoading((): boolean => true);
            try {
                const dataBets = await Promise.all(
                    betsLot.map(async (bet) => {
                        const { userId, amount, id } = bet;
                        const {
                            data: { userName },
                        } = await ProfileService.getUserName(userId);
                        return (
                            <p key={id} className={styleLot.informationBet}>
                                Пользователь @{userName} поставил ставку{" "}
                                {amount} Ac
                            </p>
                        );
                    }),
                );
                setData(() => dataBets);
            } catch (err) {
                setData(
                    (): ReactElement => (
                        <p className={styleLot.informationBet}>
                            Не удалось загрузить данные
                        </p>
                    ),
                );
            } finally {
                setLoading((): boolean => false);
            }
        })();
    }, [betsLot]);
    return (
        <div {...props}>
            <LogicDownload isLoading={loading}>
                <>{data}</>
            </LogicDownload>
        </div>
    );
};

export default ListBetsLot;
