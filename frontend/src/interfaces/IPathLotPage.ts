import ILot from '../API/interfaces/ILot.ts';

interface IPathLotPage {
    lot: ILot;
    openBet?: () => void;
}

export default IPathLotPage;
