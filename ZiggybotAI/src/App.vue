<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>

    <div class="wrapper">

      <!-- <HelloWorld msg="You did it!" /> -->

    </div>
  </header>
  <div >
    <Nav />
  </div>

  <RouterView />
</template>

<style scoped>


</style>
