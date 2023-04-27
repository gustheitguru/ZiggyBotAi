<template>
  <div class="message">
    <div v-if="text">
      {{ text }}
    </div>
    <div v-if="image">
      <img
        :src="image"
        class="message-image"
        @click="$emit('openImage', image)"
        alt="Generated Image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.message {
  /* your existing CSS for messages */
}

.message-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}
</style>
