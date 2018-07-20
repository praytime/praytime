const vue_app = new Vue({
    el: '#app',
    data: {
        message: '',
        events: []
    }
})

function getFirebaseDb() {
    // Initialize Firebase
    const fb_app = firebase.initializeApp({
        apiKey: "AIzaSyDGZV8dtmbIvm6QHdidhSjbb14gZzG_Ga0",
        authDomain: "praytime-b76cb.firebaseapp.com",
        databaseURL: "https://praytime-b76cb.firebaseio.com",
        projectId: "praytime-b76cb",
        storageBucket: "praytime-b76cb.appspot.com",
        messagingSenderId: "703212078345"
    })
    const db = firebase.firestore(fb_app)
    db.settings({ timestampsInSnapshots: true })
    return db
}

const db = getFirebaseDb()

const updatePosition = async (location) => {
    vue_app.message = ""

    const events = []

    const querySnapshotRef = await db.collection("Events").get()
    for (doc of querySnapshotRef.docs) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const evt = doc.data()
        const geo = evt.geo
        const distance = google.maps.geometry.spherical.computeDistanceBetween(location, new google.maps.LatLng(geo.latitude, geo.longitude))
        const distLabel = ( distance * 0.000621371192 ).toFixed(2)
        const merged = Object.assign({ distance: distance, distLabel: distLabel }, evt)
        events.push(merged)
    }

    // sort by distance
    events.sort((a,b) => { return a.distance - b.distance })

    vue_app.events = events
}

const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), { 
    types: [ 'geocode' ],
    fields: [ 'geometry.location' ]
})
autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    console.log(place)
    updatePosition(place.geometry.location)
})

// Try to automatically get the user location from the browser
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        vue_app.message = "Latitude: " + pos.coords.latitude + " Longitude: " + pos.coords.longitude
        updatePosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
    }, (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                // vue_app.message = "Location permission denied, enter your location in the search box"
                break;
            case error.POSITION_UNAVAILABLE:
                // vue_app.message = "Location information is unavailable, enter your location in the search box"
                break;
            case error.TIMEOUT:
            case error.UNKNOWN_ERROR:
            default:
                // vue_app.message = "Enter your location in the search box."
                break;
        }

    })
} else {
    // vue_app.message = "Geolocation not supported by this browser"
}

