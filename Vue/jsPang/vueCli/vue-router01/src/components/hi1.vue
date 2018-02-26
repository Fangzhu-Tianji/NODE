<template>
  <div>
      <h2 class="tit">{{msg}}-{{$route.params.username}}-{{$route.params.id}}</h2>
  </div>
</template>

<script>
export default {
    name: 'hi1',
    data () {
        return {
            msg: 'this is hi1页面'
        }
    }
}
</script>

<style scoped>
.tit {
    color: #555;
}
</style>
