<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label class="container">
    {{ label }}
    <input type="checkbox" v-model="model" :value="value" />
    <span class="checkmark"></span>
  </label>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 22px;
  align-items: center;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  padding: 4px;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--primary-inv-color);
  border-radius: 4px;
  border: 2px solid var(--icon-primary-color);
  transition: var(--el-transition);
  cursor: pointer;
  width: 22px;
  height: 22px;
}

.container:hover input ~ .checkmark {
  border: 2px solid var(--primary-second-color);
}

.container input:checked ~ .checkmark {
  background: var(--primary-second-color);
  border: 2px solid var(--primary-second-color);
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 2px;
  top: 4px;
  width: 14px;
  height: 11px;
  background-image: url('/images/svg/checked.svg');
}
</style>
