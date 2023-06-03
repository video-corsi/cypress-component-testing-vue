<script setup lang="ts">
// src/App.vue
import Panel from './components/Panel.vue';

function doSomething() {
  window.alert('hello')
}
</script>

<template>
  <Panel title="one">
    content one
  </Panel>

  <Panel
    title="two"
    icon="😅"
    :isOpen="false"
    @iconClick="doSomething"
  >
    content two
  </Panel>
</template>

