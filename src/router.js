import Vue from "vue";
import Router from "vue-router";
// import { isFunction } from 'util';
import weather from "./views/weather.vue";
import time from "./components/time.vue"
import AQI from "./views/AQI.vue"
import chart from "./views/chart.vue"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/weather/time1"
    },
    {
      path: "/weather",
      component: weather,
      children: [
        {
          path: "time1",
          component: time,
        },
        {
          path: "time2",
          component: time
        },
        {
          path: "time3",
          component: time
        }
      ]
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
    {
      path:"/AQI",
      component:AQI
    },
    {
      path:"/chart",
      component:chart
    },
    {
      path: "/*",
      redirect: "/weather/time1"
    }
  ]
});
