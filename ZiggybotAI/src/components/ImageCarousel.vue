<template>
  <div class="carousel-container" v-if="show">
    <div class="carousel-overlay" @click="closeCarousel"></div>
    <div class="carousel-content">
      <button class="carousel-button prev" @click="prev">&laquo;</button>
      <img :src="images[currentIndex]" class="carousel-image" />
      <button class="carousel-button next" @click="next">&raquo;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCarousel",
  props: {
     images: Array,
    },
  data() {
    return {
      currentIndex: 0,
      show: false,
    };
  },
  methods: {
    openCarousel() {
      this.show = true;
    },
    closeCarousel() {
      this.show = false;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
};
</script>

<style scoped>
.carousel-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.carousel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-content {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel-image {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.carousel-button {
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}

.carousel-button.prev {
  margin-right: 1rem;
}

.carousel-button.next {
  margin-left: 1rem;
}
</style>
