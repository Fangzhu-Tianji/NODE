<template>
    <div>
        <h2>{{msg}}</h2><hr/>
        <h3>{{$store.state.count}}-{{count}}</h3>
        <p>
            <button @click="$store.commit('add')">+</button>
            <button @click="$store.commit('reduce')">-</button>
            <button @click="gain">获取</button>
        </p>
    </div>
</template>

<script>
import store from '@/vuex/store'
export default {
    data () {
        return {
            msg: 'Hello Vuex'
        }
    },
    store,
    computed: {
        count () {
            return this.$store.state.count;
        }
    },
    methods: {
        gain: () => {
            console.log(store.state.count);
        }
    }
}
</script>

