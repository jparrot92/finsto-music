<template lang="pug">
  #app
    fm-header

    fm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container
          .field.has-addons
            input.input.is-large(
              type="text",
              placeholder="Busacar canciones",
              v-model="searchQuery"
            )
            a.button.is-info.is-large(@click="search") Buscar
            a.button.is-danger.is-large &times;
      .container
        p.help.is-info.has-text-righ
          small {{searchMessage}}
      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks")
            fm-track(
              :class="{ 'is-active': t.id === selectedTrack }",
              :track="t",
              @select="setSelectedTrack"
            )
    fm-footer
</template>

<script>
import trackService from '@/services/track'
import FmFooter from '@/components/layout/Footer.vue'
import FmHeader from '@/components/layout/Header.vue'
import FmTrack from '@/components/Track.vue'
import FmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',
  components: { FmFooter, FmHeader, FmTrack, FmLoader },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: ''
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) {
        this.tracks = []
        return
      }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  }
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
