/**
 * firebase.config.js
 * Configuración centralizada para Firebase Authentication y Firestore.
 * Permite sobreescritura dinámica mediante window.FIREBASE_CONFIG si se define en despliegue.
 */
const FIREBASE_CONFIG = window.FIREBASE_CONFIG || {
    apiKey: "AIzaSyBnevCDXEbV7TdPtsW-gaO3XabkQUsAKi0",
    authDomain: "examenes.firebaseapp.com",
    projectId: "examenes",
    storageBucket: "examenes.firebasestorage.app",
    messagingSenderId: "255739838703",
    appId: "1:255739838703:web:512555d95445e14f821b1a"
};

if (typeof window !== 'undefined') {
    window.FIREBASE_CONFIG = FIREBASE_CONFIG;
}
