/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import { RecaptchaVerifier } from 'firebase/auth';

export {};

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}
