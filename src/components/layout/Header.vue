<template lang="pug">
  section.hero.is-success
    // Hero head: will stick at the top
    .hero-head
      nav.navbar
        .container
          .navbar-brand
            .navbar-item
              strong 📻 Platzi Music
            span.navbar-burger.burger(data-target='navbarMenuHeroA')
              span
              span
              span
          #navbarMenuHeroA.navbar-menu
            .navbar-end
              router-link.navbar-item(:to="{ name: 'search' }") Buscar
              router-link.navbar-item(to="about") Nosotros
    // Hero content: will be in the middle
    .hero-body
      .container.has-text-centered
        h1.title
          | Platzi Music
        h2.subtitle
          | Canciones que están Vue-nísimas
        fm-player
</template>

<script>
import FmPlayer from '@/components/Player.vue'

export default {
  components: { FmPlayer }
}
</script>
