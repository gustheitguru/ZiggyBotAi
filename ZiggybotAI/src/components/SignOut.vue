<template>
    <p><button @click="handleSignOut">SignOut</button> </p> 
</template>

<script setup>  
    import {ref} from "vue";
    import "firebase/auth";
    import { getAuth, signOut } from "firebase/auth";
    import {useRouter} from 'vue-router' // import router
    const router = useRouter();
   
    const handleSignOut = () => {
    signOut(getAuth())
        .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful")
        router.push("/");
        })
        .catch((error) => {
        // An error happened.
        console.error(error);
        });
    };

   
</script>