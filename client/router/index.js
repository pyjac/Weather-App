import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Search from '../views/Search'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'search',
      path: '/search/:keyword',
      component: Search
    }
  ]
})
