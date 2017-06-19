<template>
  <div id="app">
    <h1 v-html="title"></h1>
    <h2 v-html="titleh2"></h2>
    <input v-model="newItem" @keyup.enter="onEnter" />
    <ul>
      <li v-for="item in items" v-bind:class="{red: item.isFunction}" v-on:click="toggleFinish('hello world')">
        {{item.label}}
      </li>
    </ul>
    <ul>
      <li v-for="(item,index) in li" v-bind:class="{ green: item.c}">
        {{index}} +
        {{item.a}} +
        {{item}}
      </li>
    </ul>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data (){
    return {
      title: '<span>hhaha</span>this is title',
      titleh2: '这是h2标签这时候标签',
      items: [
        {
          label: 'coding',
          isFunction: false
        },
        {
          label: 'github',
          isFunction: true
        }
      ],
      li: [
        {
          a: '1这是a',
          b: '1这是b',
          c: true
        },
        {
          a: '2这是a',
          b: '2这是b',
          c: false
        }
      ],
      newItem: ""
    }
  },
  methods: {
    toggleFinish: function(res){
      console.log(res);
    },
    onEnter: function(){
      this.items.push({
        label: this.newItem,
        isFunction: true
      });
      this.newItem = '';
    }
  },
  name: 'app'
}
</script>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
