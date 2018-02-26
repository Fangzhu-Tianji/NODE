<template>
  <div>
      <h2 class="tit">{{msg}}</h2>
  </div>
</template>

<script>
export default {
    name: 'hi2',
    data () {
        return {
            msg: 'this is hi2页面'
        }
    }
}
</script>

<style scoped>
.tit {
    color: #555;
}
</style>
