import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAnWTcw0vHA2kiuRg_LrPZqyl92cfZERkg",
  authDomain: "todo-list-e2699.firebaseapp.com",
  projectId: "todo-list-e2699",
  storageBucket: "todo-list-e2699.appspot.com",
  messagingSenderId: "766457835678",
  appId: "1:766457835678:web:4a7b02b1fcca5b0ff44b8f",
  databaseURL: "https://todo-list-e2699-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
