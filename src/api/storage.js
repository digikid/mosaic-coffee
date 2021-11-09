import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const {
  VUE_APP_FIREBASE_API_KEY: API_KEY,
  VUE_APP_FIREBASE_AUTH_DOMAIN: AUTH_DOMAIN,
  VUE_APP_FIREBASE_DB_URL: DB_URL,
  VUE_APP_FIREBASE_PROJECT_ID: PROJECT_ID,
  VUE_APP_FIREBASE_STORAGE_BUCKET: STORAGE_BUCKET,
  VUE_APP_FIREBASE_MESSAGING_SENDER_ID: MESSAGING_SENDER_ID,
  VUE_APP_FIREBASE_APP_ID: APP_ID
} = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage }
