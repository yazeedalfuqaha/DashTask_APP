import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD1GZgmopPI2yj9ep9DqI37woIXCvh4BkM",
  authDomain: "lernova-1db47.firebaseapp.com",
  projectId: "lernova-1db47",
  storageBucket: "lernova-1db47.firebasestorage.app",
  messagingSenderId: "407093213467",
  appId: "1:407093213467:web:22587e4177d62d554bbbbe"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }

export default boot(() => {})
