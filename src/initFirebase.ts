import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: 'AIzaSyATQ9UTDG8cYLtGM3mbq8EBKgSOWZmlPY0',
  authDomain: `booking-e17f3.firebaseapp.com`,
  databaseURL: `https://booking-e17f3-default-rtdb.firebaseio.com`,
  projectId: 'booking-e17f3',
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };