<template>
  <div class="home">
    <router-link to="/home/about">ggggg</router-link>
    <img alt="Vue logo" src="../assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
    return{
      gg:"你好啊"
    }
  },
  components: {
    HelloWorld,
  }
}
</script>
