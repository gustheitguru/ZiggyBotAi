<template>
  <div v-if="isUserLoaded">
    <nav>
      <RouterLink v-if="!currentUser.value" to="/">Landing</RouterLink> <a>| </a>
      <RouterLink v-if="!currentUser.value" to="/chat">ZiggyBot</RouterLink> <a>| </a>
      <RouterLink v-if="!currentUser.value" to="/settings">Settings</RouterLink> <a>| </a>
      <a v-if="!currentUser.value" @click="handleSignOut">SignOut</a>
      <span v-if="currentUser.value && currentUser.value.email">{{ currentUser.value.email }}</span>
    </nav>
  </div>
</template>






<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const currentUser = ref(null);
    const isUserLoaded = ref(false);

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          // console.log("Sign-out successful");
          router.push("/");
        })
        .catch((error) => {
          // An error happened.
          console.error(error);
        });
    };

    onAuthStateChanged(auth, (user) => {
        // console.log("Auth state changed: ", user);
        currentUser.value = user;
        // console.log("Current user email: ", currentUser.value.email);
        isUserLoaded.value = true;
    });

    // console.log("Returning user object: ", currentUser);
    return {
      currentUser,
      handleSignOut,
      isUserLoaded,
    };
  },
};


</script>
