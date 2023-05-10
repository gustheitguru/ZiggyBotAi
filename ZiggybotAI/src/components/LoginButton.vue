<template>
  <button type="button" @click="signInWithGoogle">{{ msg }}</button>
</template>

<script setup>
import { ref } from 'vue';
import 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router'; // import router
import Cookies from 'js-cookie';


defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const router = useRouter();

// Login.vue

const signInWithGoogle = () => {
  //console.log('signInWithGoogle called');

  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(async (result) => {
      //console.log('signInWithPopup result:', result);

      // Send a request to the backend to generate the JWT and store it in a cookie
      await fetch('http://localhost:3000/generateJWT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: result.user }),
      })
      .then(async (response) => {
        //console.log(response)
        if (response.ok) {
        const jwt = (await response.json()).token;
        localStorage.setItem('jwt', jwt);
        //console.log('JWT:', jwt);

 
        } else {
          //console.log('generateJWT failed:', response);
        }
      });

      //console.log('routing to /chat');
      router.push('/chat');
    })
    .catch((error) => {
      //console.log('signInWithPopup error:', error);
    });
};



</script>
