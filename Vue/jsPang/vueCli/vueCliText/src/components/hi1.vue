<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>{{ $route.params.userName }}</p>
    </div>
</template>

<script>
export default {
  name: 'hi1',
  data () {
    return {
      msg: 'I am HI1 page'
    }
  }
}
</script>

<style scoped>

</style>
