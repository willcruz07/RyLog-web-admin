import { ICity } from '../firebase/firestore/Cities';

export interface IAmountCollectDeliveries {
    from: ICity;
    to: ICity;
    deliveryAmount: number;
    collectionAmount: number;
}

export interface IGetCollectDeliveries extends IAmountCollectDeliveries {
    id: string;
}
