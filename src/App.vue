<template>
  <div id="app">
    App
    <loading ref="loading" />
    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'
// Load layout components dynamically.
const requireContext = require.context('@/layouts', false, /.*\.vue$/)
const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  el: '#app',
  components: {
    Loading
  },
  data: () => ({
    layout: null,
    defaultLayout: 'default'
  }),
  computed: {
    ...mapGetters({
      appName: 'config/appName'
    })
  },
  metaInfo () {
    return {
      title: this.appName,
      titleTemplate: `%s · ${this.appName}`
    }
  },
  mounted () {
    this.$loading = this.$refs.loading
  },
  methods: {
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }
      this.layout = layouts[layout]
    }
  }
}
</script>
