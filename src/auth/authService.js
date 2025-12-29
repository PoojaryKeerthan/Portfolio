import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../FireBase/firebase";
import { createUserIfNotExists } from "../services/progressService";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserIfNotExists(result.user);
    toast.success("Logged in successfully");
    return result.user;
  } catch (error) {
    toast.error("Error in Signing in..")
    console.error(error);
  }
};

export const signupWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    toast.success("Account Created successfully")
    return userCredential.user;
  } catch (error) {
    console.log(error);
    toast.error("Error in creating account")
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully");
    return userCredential.user;
  } catch (error) {
    console.log(error);
    toast.error("Error in Signing in..")
  }
};


export const logout = async () => {
 try {
     await signOut(auth);
     toast.success("Logged out successfully")
 } catch (error) {
    console.log(error);
    toast.error("Error in logging out")
 }
};

