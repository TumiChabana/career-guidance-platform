const admin = require('firebase-admin');
const path = require('path');

// Check if running in production
const serviceAccountPath = process.env.NODE_ENV === 'production'
  ? '/etc/secrets/serviceAccountKey.json'
  : path.join(__dirname, 'serviceAccountKey.json');

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };