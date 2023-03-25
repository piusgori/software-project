import axios from "axios";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { SERVER_URL } from "../utils/data";
import { auth, database, firebaseConfig } from "../utils/firebase";

export const AuthContext = createContext({
    profile: null,
    login: (data) => {},
    setProfile: (data) => {},
    signup: (data) => {},
});

const AuthContextProvider = ({ children }) => {
    const [profile, setProfile] = useState();
    const [firebaseUser, setFirebaseUser] = useState();

    const login = async (data) => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/login`, data);
            await firebaseLogin(response.data.user.email, data.password || data.githubId);
            setProfile(response.data.user);
        } catch (err) {
            throw err;
        }
    }

    const signup = async (data) => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/register`, data);
            await firebaseSignup(data.email, data.password || data.githubId);
            await firebaseUpdate(`${data.firstName} ${data.lastName}`);
            setProfile(response.data.user);
        } catch (err) {
            throw err;
        }
    }

    const firebaseSignup = async (email, password) => {
        try {
          const theUser = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(database, 'newUsers', theUser.user.uid), {
            uid: theUser.user.uid,
            email,
            displayName: email,
            photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          });
          await setDoc(doc(database, 'userChats', theUser.user.uid), {});
          setFirebaseUser({ ...theUser.user, displayName: email, photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' });
        } catch (err) {
          console.log(err);
          throw err;
        }
      };

      const firebaseUpdate = async (name, photoURL='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png') => {
        try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseConfig.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, displayName: name, photoUrl: photoURL, returnSecureToken: true })
        });
        if(!response.ok) throw new Error('An error has occured');
        const responseData = await response.json();
        await setDoc(doc(database, 'newUsers', auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: name,
            photoURL: photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        })
        setFirebaseUser(prev => ({ ...prev, displayName: name, photoURL: photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }));
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const firebaseLogin = async (email, password) => {
        try {
          const theUser = await signInWithEmailAndPassword(auth, email, password);
          setFirebaseUser(theUser.user);
        } catch (err) {
          throw err;
        }
      };

      const firebaseSignout = async () => {
        try {
          await signOut(auth);
          setFirebaseUser();
        } catch (err) {
          throw err;
        }
      }

    const value = {
        login,
        profile,
        setProfile,
        signup,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContextProvider;