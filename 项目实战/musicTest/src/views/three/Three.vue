<template>
  <div>three</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Three',
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      axios.get('/easymock/mock/5bfb596c9e5f960c846000ac/music-test/response', {
        params: {
          name: 'zuoch'
        }
      })
      .then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      console.log(res)
    }
  }
}
</script>
