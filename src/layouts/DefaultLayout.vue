<script setup lang="ts"></script>

<template>
  <main
    :class="{
      'page-container': true
    }"
  >
    <slot />
  </main>
</template>

<style scoped lang="scss">
.page-container {
  scroll-behavior: smooth;
  overflow: auto;
  padding: 24px 16px 8px;
  position: relative;
  height: auto;
  background: var(--bg-color);
}

@media (min-width: 768px) {
  .page-container {
    padding: 30px 32px 8px;
    height: 100vh;
  }
}
</style>
