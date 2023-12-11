import IResponseAuction from './IResponseAuctions.ts';

type IAuction = Omit<IResponseAuction, 'lotsCount'>;

export default IAuction;
