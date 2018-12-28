<template lang="pug">
  #app
    section.section
      nav.nav.has-shadow
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
        .columns
          .column(v-for="t in tracks") {{ t.name }} - {{ t.artists[0].name }}
</template>

<script>
import trackService from './services/track'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: []
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

      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
        })
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .results{
    margin-top: 24px;
  }
</style>
