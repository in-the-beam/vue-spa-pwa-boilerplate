<template>
  <div class="default-layout">
    Default Layout
    <child />
  </div>
</template>

<script>
import Child from '@/components/Child'

export default {
  name: 'DefaultLayout',
  components: {
    Child
  }
}
</script>

<style lang="scss">
.default-layout {
}
</style>
