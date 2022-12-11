import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDh-RmARdzZW66xP03M3rRtcyCELlRqJTM",
  authDomain: "zomato-clone-5e743.firebaseapp.com",
  projectId: "zomato-clone-5e743",
  storageBucket: "zomato-clone-5e743.appspot.com",
  messagingSenderId: "803252151936",
  appId: "1:803252151936:web:deca688475ae62d259e865",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export const signInWithGoogle=()=>
{
signInWithPopup(auth,provider).then((result)=>
{
const name=result.user.displayName;
const profilePic=result.user.photoURL;
localStorage.setItem("name",name);
localStorage.setItem("profilePic",profilePic);
}).catch((error)=>
{
  console.log(error);
});
}

export const signOutFromGoogle=()=>
{
signOut(auth).then((result)=>
{
  alert("Successfully logged out");
}).catch((e)=>
{
console.log(e);
});
}
