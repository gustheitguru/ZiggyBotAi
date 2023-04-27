<template>
  <div class="message">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

