<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  icon: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'iconClick'): void
}>()

const isClosed = ref(!props.isOpen)

function onClick() {
  isClosed.value = !isClosed.value
  emit('iconClick')
}
</script>

<template>
  <div>
    <div class="flex justify-between bg-slate-800 text-white p-3" @click="onClick">
      {{ title }}
      <div>{{ icon }}</div>
    </div>

    <div class="p-3 bg-slate-200" v-if="!isClosed">
      <slot />
    </div>
  </div>
</template>
