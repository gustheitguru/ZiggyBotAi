<template>
    <button type="button"  @click="signInWithGoogle">{{ msg }}</button>
</template>

<script setup>
    import {ref} from "vue";
    import "firebase/auth";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import {useRouter} from 'vue-router' // import router
    defineProps({
                    msg: {
                        type: String,
                        required: true
                    }
                })
    
    const router = useRouter();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
            .then((result) => {
                // console.log(result.user);
                router.push("/chat");
            }).catch((error) => {
                console.log(error)
            })
    };
</script>