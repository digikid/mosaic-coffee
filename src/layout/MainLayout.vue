<template>
  <TheMain />
  <TheFooter />
</template>

<script>
import TheMain from '@/components/TheMain'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'MainLayout',
  components: { TheFooter, TheMain }
}
</script>
