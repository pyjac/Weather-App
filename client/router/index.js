import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Search from '../views/Search'
import WeatherDetails from '../views/WeatherDetails'

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
    },
    {
      name: 'weather-detailed',
      path: '/weather/:woeid',
      component: WeatherDetails
    }
  ]
})
