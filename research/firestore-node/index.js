const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const document = firestore.doc('posts/intro-to-firestore');

const main = async () => {
    console.log("start")
    // Enter new data into the document.
    const result = await document.set({
        title: 'Welcome to Firestore',
        body: 'Hello World',
    })
    console.log("finish")

    console.log(result)
}

main()
