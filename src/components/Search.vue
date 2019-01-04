<template lang="pug">
  main
    transition(name="move")
      fm-notification(v-show="showNotification")
        p(slot="body") No se encontraron resultados

    transition(name="move")
      fm-loader(v-show="isLoading")

    section.section(v-show="!isLoading")
      nav.nav
        .container
          .field.has-addons
            input.input.is-large(
              type="text",
              placeholder="Busacar canciones",
              v-model="searchQuery",
              @keyup.enter="search"
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
              v-blur="t.preview_url"
              :class="{ 'is-active': t.id === selectedTrack }",
              :track="t",
              @select="setSelectedTrack"
            )
</template>

<script>
import trackService from '@/services/track'

import FmTrack from '@/components/Track.vue'

import FmNotification from '@/components/shared/Notification.vue'
import FmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',
  components: { FmTrack, FmLoader, FmNotification },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      showNotification: false,
      selectedTrack: ''
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
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
          this.showNotification = res.tracks.total === 0
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
  .results{
    margin-top: 24px;
  }

  .is-active{
    border: 3px #23d160 solid;
  }
</style>
