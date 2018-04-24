import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: "AIzaSyBBdul_CSAnYBuHGmBVZ10BDlHPs63Ayuk",
  authDomain: "kanban-25882.firebaseapp.com",
  databaseURL: "https://kanban-25882.firebaseio.com",
  projectId: "kanban-25882",
  storageBucket: "kanban-25882.appspot.com",
  messagingSenderId: "1087385009036"
})

export const db = app.database()
export const namesRef = db.ref('names')
export const tasksRef = db.ref('tasks')