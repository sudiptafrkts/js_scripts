const fs = require('fs');
const firebase = require('firebase');
require("firebase/firestore");

const collection_name = 'truck';
const directory = 'usit_'+collection_name+'_data';
const filename = directory+'.json';
// var outfilename = filename.replace('data','data_out');

var app = firebase.initializeApp({
    apiKey: "AIzaSyBNDv7wSlq6vXwMX_7DPJbxMi2gRudrpD0",
    authDomain: "sample-b1180.firebaseapp.com",
    projectId: "sample-b1180"
  });
  
const db = firebase.firestore();


fs.readFile('../'+directory + '/' + filename, 'utf8', function(err, contents) {
    if (err){
        console.log('Error reading file' + err);
    }else{
        (new Promise((resolve, reject) => {  
            if(sendToFirebase(contents)) { 
                resolve(); 
            } else { 
                reject(); 
            } 
        })).then(() => { 
            console.log('Uploaded');
            // app.delete();
        }). 
        catch(() => { 
            console.log('Upload Failed');
            // app.delete();
        });
    } 
});


var sendToFirebase = (data) => {
    data = JSON.parse(data);
    console.log(data.length);
    var counter = 0;
    data.forEach(function(d) {
        var entry = {}
        Object.keys(d).forEach(function(key){
            entry[key]=d[key];
        });
        counter++;
        db.collection(collection_name).doc(entry.truck_number).set(entry); //.add(entry)
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        //     counter++;
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });
    });
    return data.length == counter;
}
