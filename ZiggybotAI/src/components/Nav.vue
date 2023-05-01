<template>
  <div v-if="isUserLoaded">
    <nav>
      <RouterLink to="/">Landing</RouterLink> <a>| </a>
      <RouterLink to="/chat">ZiggyBot</RouterLink> <a>| </a>
      <RouterLink to="/settings">Settings</RouterLink> <a>| </a>
      <a @click="handleSignOut">SignOut</a>
      <!-- <span>{{ currentUser.value.email }}</span> -->
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
  currentUser.value = user;
  isUserLoaded.value = !!user;
});

    // console.log(isUserLoaded.value);
    return {
      currentUser,
      handleSignOut,
      isUserLoaded,
    };
  },
};


</script>
