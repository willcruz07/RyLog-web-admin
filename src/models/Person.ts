interface ICity {
    name: string;
    ref: string;
}

interface IAddress {
    district: string;
    zipCode: string;
    complement: string;
    country: string;
    street: string;
    number: string;
    ref: string;
    state: string;
    reference: string;
    city: ICity;
}

export interface IPerson {
    id: string;
    name: string;
    phone: string;
    address: IAddress;
    cpf?: string;
    rg?: string;
    userRef?: string;
}
