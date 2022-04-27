import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

const config = {
    apiKey: 'AIzaSyDIBBOVRbgqzDUPTIz6OkfGSV_1O_fUN20',
    authDomain: 'ry-log-prod.firebaseapp.com',
    projectId: 'ry-log-prod',
    storageBucket: 'ry-log-prod.appspot.com',
    messagingSenderId: '904109638058',
    appId: '1:904109638058:web:3105ca1589387c4e2e2bd3',
    measurementId: 'G-FPZJWV6SCL',
};

const firebaseApp = initializeApp(config);

export const dbFirestore = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage();
export const storageRef = ref;
