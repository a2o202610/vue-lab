<template>
  <footer class="footer">
    <p>{{ copyright }}</p>
    <p class="hint">实验四 · Pinia状态管理与Element Plus</p>
  </footer>
</template>

<script setup>
defineProps({
  copyright: { type: String, required: true }
})
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 1rem;
}
.footer p { margin: 4px 0; }
.hint { font-size: 0.85rem; color: #bdc3c7; }
</style>
