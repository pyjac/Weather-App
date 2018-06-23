import Vue from 'vue'
import Vuex from 'vuex'
import WeatherResource from '../resources/weather'

Vue.use(Vuex)


// mutation-types
const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
const SET_LOADING = 'SET_LOADING';

const state = {
  homeWeatherData: [],
  loading: false,
}

const mutations = {
  SET_WEATHER_DATA (state, weatherData) {
    Vue.set(state, 'homeWeatherData', weatherData)
  },
  SET_LOADING (state, loading) {
    Vue.set(state, 'loading', loading)
  }
}

const actions = {
  async fetchHomeWeather ({ commit }) {
    commit(SET_LOADING, true)
    try {
      const data = await Promise.all([
        WeatherResource.getLocationWeather('2344116'),
        WeatherResource.getLocationWeather('638242'),
        WeatherResource.getLocationWeather('44418'),
        WeatherResource.getLocationWeather('565346'),
        WeatherResource.getLocationWeather('560743'),
        WeatherResource.getLocationWeather('9807')
      ])
      commit(SET_WEATHER_DATA, data)
    } catch (error) {
      console.log(error)
    }
    commit(SET_LOADING, false)
  },
}

// getters
const getters = {
  homeWeatherData: (state) => state.homeWeatherData,
  loading: (state) => state.loading,
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
