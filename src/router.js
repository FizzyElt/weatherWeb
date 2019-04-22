import Vue from "vue";
import Router from "vue-router";
// import { isFunction } from 'util';
import Home from "./views/Home.vue";
import about from "./views/About.vue"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "home"
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "about",
          component: about
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
      path: "/*",
      redirect: "/home"
    }
  ]
});
