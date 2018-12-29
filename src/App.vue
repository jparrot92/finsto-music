<template lang="pug">
  #app
    fm-header
    router-view
    fm-footer
</template>

<script>
import FmFooter from '@/components/layout/Footer.vue'
import FmHeader from '@/components/layout/Header.vue'

export default {
  name: 'app',
  components: { FmFooter, FmHeader }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .results{
    margin-top: 24px;
  }

  .is-active{
    border: 3px #23d160 solid;
  }
</style>
