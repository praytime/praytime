var vue_app = new Vue({
            el: '#app',
            data: {
                events: []
            }
        });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGZV8dtmbIvm6QHdidhSjbb14gZzG_Ga0",
    authDomain: "praytime-b76cb.firebaseapp.com",
    databaseURL: "https://praytime-b76cb.firebaseio.com",
    projectId: "praytime-b76cb",
    storageBucket: "praytime-b76cb.appspot.com",
    messagingSenderId: "703212078345"
};

var fb_app = firebase.initializeApp(config);
var db = firebase.firestore(fb_app);
db.settings({ timestampsInSnapshots: true });

db.collection("Events").orderBy("geo").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        vue_app.events.push(doc.data());
    });
});
