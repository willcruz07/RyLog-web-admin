import { IPerson } from './Person';
import { TCollectStatus, TDeliveryStatus, TPeriod } from './types';

interface IDeliverymanCollectDelivery {
    name: string;
    deliverymanRef: string;
}

export interface ICollectionsAndDeliveries {
    id: string;
    data: Date;
    receiver: IPerson;
    printedLabel: boolean;
    pathSignature: string;
    period: TPeriod;
    sender: IPerson;
    collectStatus: TCollectStatus;
    deliveryStatus: TDeliveryStatus;
    deliverymanCollect?: IDeliverymanCollectDelivery;
    deliverymanDelivery?: IDeliverymanCollectDelivery;
}
