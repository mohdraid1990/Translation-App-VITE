<template>
  <div id="app">
    <TranslationComponent />
  </div>
</template>

<script setup>
import TranslationComponent from "./components/TranslationComponent.vue";
</script>

<style scoped lang="scss">
#app {
  font-family: "Roboto", sans-serif;
  margin-top: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
