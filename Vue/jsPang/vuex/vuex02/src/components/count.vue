<template>
    <div>
        <h2>{{msg}}</h2>
        <p>{{$store.state.countter}}-{{countter}}</p>
        <div>
            <button @click="$store.commit('add',10)">+</button>
            <button @click="$store.commit('reduce')">-</button>
            <button @click="git">获取</button>
            <button @click="add(5)">+</button>
            <button @click="reduce">-</button>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
// import {mapState} from 'vuex'
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
    data () {
        return {
            msg: 'this is count!'
        }
    },
    store,
    computed: {
        ...mapState(['countter']),
        // countter () {
        //     return this.$store.getters.countter;
        // }
        ...mapGetters(['countter'])
    },
    methods: {
        git () {
            console.log(store.state.countter);
        },
        ...mapMutations([
            'add','reduce'
        ])
    }
    // methods: mapMutations([
    //     'add','reduce'
    // ])
}
</script>

