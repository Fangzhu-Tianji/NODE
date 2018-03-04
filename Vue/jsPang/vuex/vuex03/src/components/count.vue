<template>
    <div>
        <h2>{{msg}}</h2>
        <h2>三种方式赋值</h2>
        <h3>{{$store.state.count}}</h3>
        <h3>{{countt}}</h3>
        <h3>{{count}}</h3>
        <div>
            <button @click="$store.commit('add',5)">+</button>
            <button @click="$store.commit('reduce')">-</button>
            <button @click="git">获取</button>
            <button @click="add(10)">简单+</button>
            <button @click="reduce">简单-</button>
            <button @click="addAction">actions+</button>
            <button @click="reduceAction">actions-</button>
        </div>
        <!-- <h3>{{countGet}}</h3> -->
    </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'

export default {
    data () {
        return {
            msg: 'i am count'
        }
    },
    store,
    computed: {
        countt () {
            return this.$store.state.count
        },
        // countGet () {
        //     return this.$store.getters.count
        // },
        ...mapState(['count']),
        // ...mapGetters(['count'])
    },
    methods: {
        git () {
            console.log(this.$store.state.count);
        },
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction']),
    }
}
</script>

