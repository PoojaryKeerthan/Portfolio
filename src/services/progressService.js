import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../FireBase/firebase";

export const createUserIfNotExists = async (user) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        await setDoc(ref, {
            name: user.displayName,
            email: user.email,
            progress: {},
        });
    }
};

export const toggleProblem = async (uid, problemId, value) => {
  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      progress: {
        [problemId]: value,
      },
    },
    { merge: true }
  );
};


export const getUserProgress = async (uid) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    return snap.exists() ? snap.data().progress || {} : {};
};
