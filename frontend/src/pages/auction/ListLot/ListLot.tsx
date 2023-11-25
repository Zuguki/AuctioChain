import { FC, ReactElement, useEffect } from 'react';
import CardLot from './CardLot/CardLot.tsx';
import Pagination from '../../../components/UI/Pagination/Pagination.tsx';
import styleList from './listLot.module.css';
import stylePage from '../pageOneAuction.module.css';
import { ILot } from '../../../interfaces/lotsTypes.ts';
import useGetAPI from '../../../API/hooks/useGetAPI.ts';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import LotService from '../../../API/service/LotService.ts';
import { ResponseObjLots } from '../../../API/interfaces/ILot.ts';

const ListLot: FC<{ id: string }> = ({ id }) => {
    const {
        data: { lots },
        err,
        loading,
    } = useGetAPI<ResponseObjLots>(LotService.getLots(id), { lots: [] });
    useEffect(() => {
        console.log(lots);
    }, [lots]);
    return (
        <LogicDownload isLoading={loading}>
            <div>
                {lots.length !== 0 ? (
                    <>
                        <p className={stylePage.informationLots}>
                            Количество лотов: {lots.length}
                        </p>
                        <div className={styleList.position}>
                            {lots.map(
                                (lot): ReactElement => (
                                    <CardLot key={lot.id} lot={lot} />
                                ),
                            )}
                        </div>
                        <Pagination endPage={10} sendCurrentPage={() => ({})} />
                        )
                    </>
                ) : (
                    <p className={stylePage.informationLots}>Лотов нет</p>
                )}
            </div>
        </LogicDownload>
    );
};

export default ListLot;
