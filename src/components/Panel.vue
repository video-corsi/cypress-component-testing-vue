<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: String,
  isOpen: {
    type: Boolean,
    default: true
  },
});

const isOpen = ref(props.isOpen);
</script>


<template>
  <div>
    <div
      class="flex justify-between bg-slate-800 text-white p-3"
      @click="isOpen = !isOpen"
    >
      {{ title }}
      <div
          @click.stop="$emit('iconClick')"
      >{{icon}}</div>
    </div>

    <div class="p-3 bg-slate-200" v-if="isOpen">
      <slot />
    </div>
  </div>
</template>
