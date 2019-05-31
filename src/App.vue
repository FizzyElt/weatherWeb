<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link class="router-link" to="/home">Home</router-link> |
      <router-link class="router-link" to="/about">About</router-link>
    </div>-->
    <div class="navset">
      <b-nav pills>
        <router-link
          to="/weather/time1"
          class="navbtn"
          v-bind:class="{'btnactive':routercheck('weather')}"
        >天氣預報</router-link>
        <router-link
          to="/AQI"
          class="navbtn"
          v-bind:class="{'btnactive':routercheck('AQI')}"
        >空氣品質指標AQI</router-link>
        <router-link to="/chart" class="navbtn" v-bind:class="{'btnactive':routercheck('chart')}">圖表
        </router-link>
      </b-nav>
    </div>
    <div class="fadeimgbox">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1280"
        img-height="480"
      >
        <b-carousel-slide :img-src="require('./assets/nature-q-c-1280-480-2.jpg')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('./assets/nature-q-c-1280-480-5.jpg')"></b-carousel-slide>
        <b-carousel-slide :img-src="require('./assets/nature-q-c-1280-480-10.jpg')"></b-carousel-slide>
      </b-carousel>
      <h1 id="title" :style="{'font-size':titlefontsize,'line-height':titlelineheight}">
        歡迎來到
        <br>天氣預報網站
      </h1>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      tab1: true,
      tab2: false,
      titlefontsize:Math.floor(document.body.clientWidth/280)*14+'px',
      titlelineheight:Math.floor(document.body.clientWidth/280)*20+'px'
    };
  },
  methods: {
    tabchange(index) {
      this.tab = index;
    },
    fontsizechange(){
      let s=Math.floor(document.body.clientWidth/280)
      this.titlefontsize=s*14+'px'
      this.titlelineheight=s*20+'px'
    },
    routercheck(str){
      if(this.$route.path.match(str)!=null){
        return true
      }else{
        return false
      }
    }
  },
  created(){
     window.addEventListener('resize',this.fontsizechange);
  },
  destroyed(){
    window.removeEventListener('resize',this.fontsizechange);
  }
};
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC");
  font-family: "Noto Sans TC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .navset {
    padding: 4px 8px 4px 8px;
    font-size: 26px;
    background-color: rgb(231, 231, 231);
    .navbtn {
      color: black;
      margin: 0px 5px 0px 5px;
      padding: 5px;
      text-decoration: none;
      border-radius: 8px;
      transition: 0.1s;
    }
    .navbtn:hover {
      color: white;
      background-color: #353535;
    }
    .btnactive {
      color: white;
      background-color: #353535;
    }
  }
  .fadeimgbox{
    position: relative;
    #title {
    position: absolute;
    z-index: 2;
    color: white;
    border-radius: 8px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
  }
  
}
</style>

