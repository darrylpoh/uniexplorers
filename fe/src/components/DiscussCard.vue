<template>
  <div class="discuss-card card rounded-xl bg-white flex flex-col items-start border-2 text-darkgreen">
    <h2 class="discuss-title">{{ title }}</h2>
    <div class="underline"></div>
    <div class="discuss-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscussCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.discuss-card {
  padding: 1rem;
  margin: 40px;
}

.discuss-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.underline {
  width: 30%;
  height: 2px;
  background-color: #1E363E;
  margin-bottom: 1rem;
}

.discuss-content {
  margin-bottom: 1rem;
}
</style>
