<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute, RouterView } from 'vue-router'

const app_layouts: Record<string, unknown> = {
  default: defineAsyncComponent(() => import('./layouts/DefaultLayout.vue')),
  empty: 'div'
}

const route = useRoute()

const route_layout = computed<string>(() => (route.meta?.layout as string | undefined) ?? '')

const layout = computed(() => {
  return Object.keys(app_layouts).includes(route_layout.value)
    ? app_layouts[route_layout.value]
    : app_layouts.default
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
