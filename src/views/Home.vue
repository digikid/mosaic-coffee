<template>
  <SectionIntro />
  <SectionEvents />
  <SectionDelivery />
  <SectionSocials />
  <SectionPartners />
</template>

<script>
import SectionIntro from '@/components/sections/SectionIntro'
import SectionEvents from '@/components/sections/SectionEvents'
import SectionSocials from '@/components/sections/SectionSocials'
import SectionDelivery from '@/components/sections/SectionDelivery'
import SectionPartners from '@/components/sections/SectionPartners'

export default {
  name: 'Home',
  components: {
    SectionPartners,
    SectionDelivery,
    SectionSocials,
    SectionIntro,
    SectionEvents
  }
}
</script>

<style lang="scss"></style>
