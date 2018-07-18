const vue_app = new Vue({
            el: '#app',
            data: {
                message: 'Waiting for location',
                events: []
            }
        });

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDGZV8dtmbIvm6QHdidhSjbb14gZzG_Ga0",
    authDomain: "praytime-b76cb.firebaseapp.com",
    databaseURL: "https://praytime-b76cb.firebaseio.com",
    projectId: "praytime-b76cb",
    storageBucket: "praytime-b76cb.appspot.com",
    messagingSenderId: "703212078345"
};

const fb_app = firebase.initializeApp(config);
const db = firebase.firestore(fb_app);
db.settings({ timestampsInSnapshots: true });

const updatePosition = async (lat, lng) => {
    const pos = new LatLon(lat, lng);

    const events = []

    const querySnapshotRef = await db.collection("Events").get()
    for (doc of querySnapshotRef.docs) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const ev = doc.data()
        const distance = pos.distanceTo(new LatLon(ev.geo.latitude, ev.geo.longitude))
        const merged = Object.assign({ distance: distance }, ev)
        events.push(merged)
    }

    events.sort((a,b) => { return a.distance - b.distance })

    vue_app.events = events
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        vue_app.message = "Latitude: " + pos.coords.latitude + " Longitude: " + pos.coords.longitude
        updatePosition(pos.coords.latitude, pos.coords.longitude)
    }, (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                vue_app.message = "User denied the request for Geolocation."
                updatePosition(41.5718463 , -88.8110629)
                break;
            case error.POSITION_UNAVAILABLE:
                vue_app.message = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                vue_app.message = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
            default:
                vue_app.message = "An unknown error occurred."
                break;
        }
    })
} else {
    vue_app.message = "Geolocation not supported by this browser"
    updatePosition(41.5718463 , -88.8110629)
}

