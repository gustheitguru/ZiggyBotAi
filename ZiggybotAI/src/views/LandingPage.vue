<template>
  <div class="container-fluid">

    <!-- Section 2: Login and Signup Buttons -->
      <div class="col-lg-4 col-md-6">
        <div class="text-center">
          <LoginButton class="btn btn-success" msg="Login"/>
          <IconZiggyBotAI width="150px" height="150px"/>
          <LoginButton class="btn btn-info" msg="SignUp"/>
          <!-- <SignOut /> -->
        </div>
      </div>

    <!-- Section 3: Description -->
    <div class="row justify-content-center align-items-center section-3">
      <div class="col-lg-8 col-md-10">
        <div class="text-center">
          <h2 class="mb-5">Welcome to Ziggybot</h2>
          <p class="lead">The AI personal assistant designed to make your life easier. Ziggybot is an innovative and cutting-edge technology that harnesses the power of artificial intelligence to provide personalized assistance to users. As a work in progress, we are constantly refining and updating Ziggybot to deliver the best possible user experience.</p>
          <p class="lead">However, it is important to note that at this stage of development, the platform is not yet fully tested and no quality assurance can be guaranteed. Therefore, we encourage users to approach Ziggybot with an experimental mindset and to be aware that there may be limitations and inconsistencies in the AI's responses.</p>
          <p class="lead">We take the security and privacy of our users very seriously and are committed to providing a safe and reliable platform for all. As we continue to work on Ziggybot, we appreciate your patience and understanding, and welcome any feedback or suggestions you may have to improve the platform.</p>
          <p class="lead">Thank you for choosing Ziggybot as your AI assistant.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {ref} from "vue";
    import {useRouter} from 'vue-router' // import router
    import LoginButton from '../components/LoginButton.vue'
    import IconZiggyBotAI from '../components/icons/IconZiggyBotAI.vue'

</script>

<style scoped>

#app {
   color: #cd8c2a
}

.image-container {
  margin-top: -100px;
}

.section-1 {
  height: 500px;
  background-color: #eee;
}

.section-2 {
  height: 100px;
  background-color: #eee;
  margin-top: -50px;
}

.section-3 {
  padding: 50px 0;
}

.star {
  display: inline-block;
  width: 10;
  height: 10;
  border-right: 10px solid transparent;
  border-bottom: 20px solid var(--gray);
  border-left: 10px solid transparent;
  transform: rotate(35deg);
  margin-top: 8px;
}
</style>
