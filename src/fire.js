import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAFtmUTU8i4iVsLlArLJNHXrCQg2auE3Lw",
  authDomain: "fir-login-test-5e162.firebaseapp.com",
  projectId: "fir-login-test-5e162",
  storageBucket: "fir-login-test-5e162.appspot.com",
  messagingSenderId: "309470013555",
  appId: "1:309470013555:web:c153f2258a39bbe64f2206"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;