// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref as firebaseDbRef, update, remove} from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL, ref as firebaseStorageRef } from "firebase/storage";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBt4LOa1a04CSzpW4TkPaVAsQQHm86pHi0",
    authDomain: "kavu-fbf9c.firebaseapp.com",
    projectId: "kavu-fbf9c",
    storageBucket: "kavu-fbf9c.firebasestorage.app",
    messagingSenderId: "1005300213172",
    appId: "1:1005300213172:web:3e6169490347311dd8fee1"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase)
const database = getDatabase(firebase);
const storage = getStorage(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebase), (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => unsubscribe();
  }, []);

  return [user, loading];
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = firebaseDbRef(database, path);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    });

    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
      update(firebaseDbRef(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const useDbMultiUpdate = () => {
  const [result, setResult] = useState();
  // We remove the path parameter since we’ll pass complete update objects
  const updateData = useCallback((updates) => {
    // Updates should be an object containing all the paths and their values
    return update(firebaseDbRef(database), updates)
      .then(() => {
        const successResult = makeResult();
        setResult(successResult);
        return successResult;
      })
      .catch((error) => {
        const errorResult = makeResult(error);
        setResult(errorResult);
        throw error;
      });
  }, [database]); // Only depend on database instance
  return [updateData, result];
};

export const useDbRemove = (path) => {
  const [result, setResult] = useState();
  const removeData = useCallback(() => {
      remove(firebaseDbRef(database, path))
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [removeData, result];
};


export async function uploadImage(file, path) {
  try {
    if (!path || typeof path !== 'string' || path.trim() === '') {
      throw new Error("uploadImage requires a valid non-empty path string.");
    }

    const storageRef = firebaseStorageRef(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}


export async function fetchImage(downloadURL) {
  try {
    // Fetch the image data from the download URL
    const response = await fetch(downloadURL);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }
    
    // Convert the response to a Blob (binary data)
    const imageBlob = await response.blob();
    
    // Create a URL for the Blob, which can be used to display the image
    const imageObjectURL = URL.createObjectURL(imageBlob);
    
    console.log('Image fetched successfully:', imageObjectURL);
    
    return imageObjectURL; // Return the URL for displaying the image
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; // Rethrow the error for further handling
  }
}