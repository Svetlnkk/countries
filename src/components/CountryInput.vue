<script setup lang="ts">
interface IProps {
  placeholder?: string
  name: string
  required?: boolean
  type?: string
}
withDefaults(defineProps<IProps>(), {
  required: true,
  type: 'text',
  placeholder: ''
})

const modelValue = defineModel()
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :id="name"
    :name="name"
    :required="required"
    :placeholder="placeholder"
  />
</template>

<style scoped lang="scss"></style>
