import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const config = {
    apiKey: 'AIzaSyCs0RI06LLB7wSAMOAbj-q5w9D62hjnqPQ',
    authDomain: 'ry-log-prod.firebaseapp.com',
    projectId: 'ry-log-prod',
    storageBucket: 'ry-log-prod.appspot.com',
    messagingSenderId: '904109638058',
    appId: '1:904109638058:web:96e46025c96580bc2e2bd3',
    measurementId: 'G-2E6R7J8ZGS',
};

const firebaseApp = initializeApp(config);

export const dbFirestore = getFirestore(firebaseApp);
export const firebaseFunctions = getFunctions(firebaseApp, 'southamerica-east1');
export const auth = getAuth();
export const storage = getStorage();
export const storageRef = ref;
