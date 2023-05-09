<template>
  <div class="message">
    <div v-if="text">
      {{ text }}
    </div>
    <div v-if="images.length > 0" class="message-image-wrapper">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        class="message-image"
        @click="$emit('openCarousel', images)"
        :alt="'Generated Image ' + (index + 1)"
        @error="onImageError"
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
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onImageError(event) {
      console.error('Image loading error:', event);
    },
  },
};
</script>

<style scoped>
.message-image {
  max-width: 50%;
  margin: 5px;
  object-fit: cover;
  border-radius: 5px;
}

.image-container {
  display: inline-flex;
  max-width: 100%;
  overflow: hidden;
}

.message-image-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
}
</style>
