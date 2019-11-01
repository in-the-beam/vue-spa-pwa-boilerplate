<template>
  <div>
    index
    <h1>{{ pageTitle }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'default',
  metaInfo () {
    return { title: this.$t('home') }
  },
  data: () => ({
    title: window.config.appName,
    pageTitle: ''
  }),
  computed: mapGetters({
  }),
  created(){
    this.pageTitle = this.$router.currentRoute.name
  },
  methods:{
  }
}
</script>
<style scoped>
</style>
