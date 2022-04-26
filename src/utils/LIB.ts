/* eslint-disable no-useless-escape */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-param-last */

type TDate = 'initial' | 'final';
export interface IDateFirebase {
    seconds: number;
    nanoseconds: number;
}

export const combineReducer = (reducers: any) => (state: any = {}, action: any) => {
    const newState: any = {};

    for (const key in reducers) {
        newState[key] = reducers[key](state[key], action);
    }
    return newState;
};

export const addZeroLeft = (number: number): string => (number < 10 ? `0${number}` : `${number}`);

export const formattedPhone = (value: string) => {
    if (value) {
        value = removeMask(value);
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        return value;
    } return '';
};

export const removeMask = (value: string) => {
    value = value.replace(/\D/g, '');
    return value;
};

export const formattedDateTimeFirebase = (date: Date) => {
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    month = month < 10 ? `0${String(month)}` : month;
    let day: any = date.getDate();
    day = day < 10 ? `0${String(day)}` : day;

    const time = date.toLocaleTimeString();

    return `${day}/${month}/${year} ${time} `;
};

export const getDateFirebase = (date: IDateFirebase) => new Date(date.seconds * 1000 + date.nanoseconds / 1000000);

export const validDate = (value: string): boolean => {
    const patternValidaData = /^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))$/;
    return patternValidaData.test(value);
};

export const strToDate = (value: string): Date => {
    if (validDate(value)) {
        const day = Number(value.split('/')[0]);
        const month = Number(value.split('/')[1]);
        const year = Number(value.split('/')[2]);

        return new Date(year, month - 1, day);
    } return new Date();
};

export const formattedInitialOrFinalDate = (date: Date, type: TDate): Date => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    switch (type) {
        case 'initial':
            return new Date(year, month, day, 0, 0, 0);

        case 'final':
            return new Date(year, month, day, 23, 59, 59);

        default: return new Date();
    }
};

export const dateTimeToStr = (value: Date): string => {
    const date = value.toISOString().split('T')[0];
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    return `${day}/${month}/${year}`;
};

export const CombineReducer = (reducers: any) => (state: any = {}, action: any) => {
    const newState: any = {};

    for (const key in reducers) {
        newState[key] = reducers[key](state[key], action);
    }
    return newState;
};
