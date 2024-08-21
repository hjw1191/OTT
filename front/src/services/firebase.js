import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyA0IEpDGhs1pBQTceBJP_8LceOxf0ETgIY",
  authDomain: "moveweb-afe1b.firebaseapp.com",
  projectId: "moveweb-afe1b",
  storageBucket: "moveweb-afe1b.appspot.com",
  messagingSenderId: "329708070416",
  appId: "1:329708070416:web:479e2d2f505d30960b0c95",
  measurementId: "G-9PPRC0WM0C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
