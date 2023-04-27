// src/composables/useAuth.js

import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const auth = getAuth();
  const user = ref(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
        // console.log('Current User Logged in: '+ currentUser.email);
        user.value = currentUser;
    } else {
        // console.log('No User logged in');
        user.value = null;
    }
  });

  return {
    auth,
    user,
  };
}