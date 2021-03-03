import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDnivBrA7Mzn6YW0x-GZ0ryo_DyJW92yaQ',
  authDomain: 'simpleapp-7aca7.firebaseapp.com',
  databaseURL: 'https://simpleapp-7aca7-default-rtdb.firebaseio.com/',
  projectId: 'simpleapp-7aca7',
  storageBucket: 'simpleapp-7aca7.appspot.com',
  messagingSenderId: '637373142410',
  //appId: '',
  //measurementId: '',
};

firebase.initializeApp(firebaseConfig)

export default firebase