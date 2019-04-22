<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link class="router-link" to="/home">Home</router-link> |
      <router-link class="router-link" to="/about">About</router-link> -->
    </div>
    <div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://picsum.photos/1024/300/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/300/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/300/?image=22"
    ></b-carousel-slide>
  </b-carousel>
</div>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #314963;
  margin-top: 60px;
}
.router-link{
  font-size: 100px;
}
</style>
