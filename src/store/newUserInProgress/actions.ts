import { EUserTypes, IStartNewUserInPogress, IStopNewUserInPogress } from './types';

export const startNewUserInProgress = (): IStartNewUserInPogress => ({
    type: EUserTypes.START,
    payload: true,
});

export const stopNewUserInProgress = (): IStopNewUserInPogress => ({
    type: EUserTypes.STOP,
    payload: false,
});
