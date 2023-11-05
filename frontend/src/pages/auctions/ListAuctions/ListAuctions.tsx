import {FC, ReactElement} from 'react';
import ICardAuction from "./CardAuction/ICardAuction.ts";
import CardAuction from "./CardAuction/CardAuction.tsx";
import styleList from './listAuctions.module.css'
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";

const ListAuctions: FC = () => {
    const auctions: ICardAuction[] = [{
        id: 'sdsdsd',
        name: 'string',
        img: 'string',
        description: 'string',
        countPersons: 25,
        dataEnd: 'string'
    },{
        id: 'sdsdsd1',
        name: 'string',
        img: 'string',
        description: 'aknksssssssssssssss;dddddddddddddddddddddddddddddddddd/;fvsfvbmgcfcggggggggggggggggggggggggggggggg',
        countPersons: 25,
        dataEnd: 'string'
    }, {
        id: 'sdsdsd2',
        name: 'string',
        img: 'string',
        description: 'string',
        countPersons: 25,
        dataEnd: 'string'
    }, {
        id: 'sdsdsd3',
        name: 'string',
        img: 'string',
        description: 'string',
        countPersons: 25,
        dataEnd: 'string'
    }, {
        id: 'sdsdsd4',
        name: 'string',
        img: 'string',
        description: 'string',
        countPersons: 25,
        dataEnd: 'string'
    }];
    const a = (page) => {
        console.log(page)
    }
    
    return (
        // change
        <div>
            <div className={styleList.position}>
                {auctions.map((auction: ICardAuction): ReactElement => <CardAuction key={auction.id} auction={auction}/>)}
            </div>
            <Pagination endPage={10} sendCurrentPage={a}/>
        </div>
    );
};

export default ListAuctions;