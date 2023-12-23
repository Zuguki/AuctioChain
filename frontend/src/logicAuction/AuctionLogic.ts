import IAuction from '../API/interfaces/IAuction.ts';
import AuctionStatus from './AuctionStatus.ts';

export default class AuctionLogic {
    public static getTextStatus(status: AuctionStatus): string {
        return {
            0: 'Неизвестный',
            1: 'Создание',
            2: 'Ожидание торгов',
            3: 'Торги',
            4: 'Завершен',
            5: 'Отменён',
        }[status];
    }

    public static isCreation(auction: IAuction): boolean {
        return auction.status === AuctionStatus.creation;
    }

    public static isBidding(auction: IAuction): boolean {
        return auction.status === AuctionStatus.bidding;
    }

    public static isWaitBidding(auction: IAuction): boolean {
        return auction.status === AuctionStatus.waitBidding;
    }
}
