import { FC, ReactElement } from 'react';
import CardAuction from './CardAuction/CardAuction.tsx';
import styleList from './listAuctions.module.css';
import { IElementAuctions } from '../../../interfaces/auctionsTypes.ts';
import useGetAPI from '../../../API/hooks/useGetAPI.ts';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import AuctionService from '../../../API/service/AuctionService.ts';
import { ResponseObjAuctions } from '../../../API/interfaces/IResponseAuctions.ts';

const ListAuctions: FC = () => {
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { auctions },
        err,
        loading,
    } = useGetAPI<ResponseObjAuctions>(AuctionService.getAuctions(), {
        auctions: [],
    });
    return (
        // change
        <LogicDownload isLoading={loading}>
            <>
                {/**/}
                <div className={styleList.position}>
                    {auctions.map(
                        (auction: IElementAuctions): ReactElement => (
                            <CardAuction key={auction.id} auction={auction} />
                        ),
                    )}
                </div>
                {/*{auctions.length !== 0 && <Pagination endPage={Math.ceil(auctions.length / )}
                                                  sendCurrentPage={(page: number) => setCurrentPage(() => page)} />}*!/*/}
            </>
        </LogicDownload>
    );
};

export default ListAuctions;
