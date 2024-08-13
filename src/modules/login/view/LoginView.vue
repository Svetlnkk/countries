<script setup lang="ts">
import LoginForm from '../component/LoginForm.vue'
</script>

<template>
  <div class="login-card">
    <div class="login-card__title">Авторизация</div>
    <LoginForm />
  </div>
</template>

<style scoped lang="scss">
.login-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 32px;

  &__title {
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
