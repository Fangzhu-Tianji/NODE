<template>
  <div>one</div>
</template>

<script>
export default {
  name: 'One',
  mounted () {
    console.log('one-' + 'mounted')
  },
  activated () {
    console.log('one-' + 'activated')
  },
  deactivated () {
    console.log('one-' + 'deactivated')
  }
}
</script>
