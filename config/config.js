var admin = require("firebase-admin");
var firestore = require("firebase");
var serviceAccount = require("../ecommerce-mp-firebase-adminsdk-8ah7e-0105647047.json");

const firebaseConfig = {
  apiKey: "AIzaSyCPm9U_Uk85pHWXZ1FRXFPVPkfavyUZ1ec",
  authDomain: "ecommerce-mp.firebaseapp.com",
  databaseURL: "https://ecommerce-mp-default-rtdb.firebaseio.com",
  projectId: "ecommerce-mp",
  storageBucket: "ecommerce-mp.appspot.com",
  messagingSenderId: "566280341918",
  appId: "1:566280341918:web:ed3e5e3ef1d0b141492e8f",
  measurementId: "G-083VVLH2VW"
};

const app = firestore.initializeApp(firebaseConfig)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-mp-default-rtdb.firebaseio.com"
});

const adminDb = admin.firestore();
const db = app.firestore();
module.exports = adminDb;
module.exports = db;