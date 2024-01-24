import { IPutLot } from '../API/interfaces/IPostLot.ts';

interface ILotComponentInteraction {
    title: string;
    buttonText: string;
    lot: IPutLot | null;
}

export default ILotComponentInteraction;
