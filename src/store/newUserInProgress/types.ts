export enum EUserTypes {
    START = '@newUserInProgres/START',
    STOP = '@newUserInProgres/STOP'
}

export interface IStartNewUserInPogress {
    type: EUserTypes.START;
    payload: boolean;
}

export interface IStopNewUserInPogress {
    type: EUserTypes.STOP;
    payload: boolean;
}

export type TNewUserInpogressActions = IStartNewUserInPogress | IStopNewUserInPogress;

export interface INewUserInProgressState {
    status: boolean;
}
