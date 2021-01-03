import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOut as logOut,
  currentUser,
} from "../firebase/client";
import { useRouter } from "next/router";

import openNotification, {
  NOTIFICATION,
} from "../components/utils/MessageUtility";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const pathCurrent = router.pathname;
    if ("/signup" != pathCurrent) {
      user === USER_STATES.NOT_LOGGED && router.push("/signin");
    }
  }, [user]);

  const signIn = () => {
    signInWithGoogle()
      .then(() => {
        const userObject = currentUser();
        const userNameCurrent =
          (userObject && userObject.displayName) || "Guest";
        openNotification({
          type: NOTIFICATION.TYPE.SUCCESS,
          title: "Welcome",
          message: `Hi!, ${userNameCurrent}`,
        });
      })
      .catch((err) => {
        openNotification({
          type: NOTIFICATION.TYPE.ERROR,
          title: err.code,
          message: `Error: ${err.message}`,
        });
      });
  };

  const signInEmailAndPassword = ({ email, password }) => {
    signInWithEmailAndPassword(email, password)
      .then(() => {
        const userObject = currentUser();
        const userDisplay = (userObject && userObject.displayName) || "Guest";
        router.push("/");
        openNotification({
          type: NOTIFICATION.TYPE.SUCCESS,
          title: "Welcome",
          message: `Hi!, ${userDisplay}`,
        });
      })
      .catch((err) => {
        openNotification({
          type: NOTIFICATION.TYPE.ERROR,
          title: err.code,
          message: `Error: ${err.message}`,
        });
      });
  };

  const signUpEmailAndPassword = ({ email, password, username }) => {
    signUpWithEmailAndPassword(email, password, username)
      .then(() => {
        router.push("/");
        openNotification({
          type: NOTIFICATION.TYPE.SUCCESS,
          title: "Welcome",
          message: `Hi!, ${username}`,
        });
      })
      .catch((err) => {
        router.push("/signup");
        openNotification({
          type: NOTIFICATION.TYPE.ERROR,
          title: err.code,
          message: `Error: ${err.message}`,
        });
      });
  };

  const signOut = () => {
    logOut()
      .then(() => {
        openNotification({
          type: NOTIFICATION.TYPE.SUCCESS,
          message: `Bye, Bye`,
        });
      })
      .catch((err) => {
        openNotification({
          type: NOTIFICATION.TYPE.ERROR,
          title: err.code,
          message: `Error: ${err.message}`,
        });
      });
  };

  return {
    user,
    signIn,
    signOut,
    signInEmailAndPassword,
    signUpEmailAndPassword,
  };
}
