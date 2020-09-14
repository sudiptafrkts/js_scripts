const fs = require('fs');
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: 
    authDomain: ,
    databaseURL: ,
    projectId: ,
    appId: 
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var obj = db.collection('fleet');

obj.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      obj.delete();
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });