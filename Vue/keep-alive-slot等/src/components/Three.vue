<template>
  <div>
    <p>three</p>
    <slots>
      <div class="this1" slot="_1">这是slots1</div>
      <div class="this2" slot="_2">这是slots2</div>
    </slots>
  </div>
</template>

<script>
import Slots from '@/components/Slots'
export default {
  name: 'Three',
  components: {
    Slots
  },
  mounted () {
    console.log('three-' + 'mounted')
  },
  destroyed () {
    console.log('three-' + '被销毁')
  }
}
</script>
