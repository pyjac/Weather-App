import Vue from 'vue'
import Vuex from 'vuex'
import WeatherResource from '../resources/weather'

Vue.use(Vuex)


// mutation-types
const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
const SET_SEARCH_WEATHER_DATA = 'SET_SEARCH_WEATHER_DATA';
const SET_SEARCH_WEATHER_DATA_DETAILED = 'SET_SEARCH_WEATHER_DATA_DETAILED';
const SET_LOADING = 'SET_LOADING';

const state = {
  homeWeatherData: [],
  loading: false,
  searchLocationWeather: {},
  searchLocationWeatherDetailed: []
}

const mutations = {
  SET_WEATHER_DATA (state, weatherData) {
    Vue.set(state, 'homeWeatherData', weatherData)
  },
  SET_SEARCH_WEATHER_DATA (state, searchWeatherData) {
    Vue.set(state, 'searchLocationWeather', searchWeatherData)
  },
  SET_SEARCH_WEATHER_DATA_DETAILED (state, searchWeatherData) {
    Vue.set(state, 'searchLocationWeatherDetailed', searchWeatherData)
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
  async fetchLocationWeather ({ commit }, keyword) {
    commit(SET_LOADING, true)
    try {
      const data = await WeatherResource.searchLocationWeather(keyword)
      if (data.length > 0) {
        const searchWeatherData = await WeatherResource.getLocationWeather(data[0].woeid)
        commit(SET_SEARCH_WEATHER_DATA, searchWeatherData)
      } else {
        commit(SET_SEARCH_WEATHER_DATA, {})
      }
    } catch (error) {
      console.log(error)
      commit(SET_SEARCH_WEATHER_DATA, {})
    }
    commit(SET_LOADING, false)
  },
  async fetchLocationWeatherDetailed ({ commit }, weoid) {
    commit(SET_LOADING, true)
    try {
        const searchWeatherData = await WeatherResource.getLocationWeatherDetailed(weoid)
        commit(SET_SEARCH_WEATHER_DATA_DETAILED, searchWeatherData)
    } catch (error) {
      console.log(error)
      commit(SET_SEARCH_WEATHER_DATA_DETAILED, [])
    }
    commit(SET_LOADING, false)
  }
}

// getters
const getters = {
  homeWeatherData: (state) => state.homeWeatherData,
  loading: (state) => state.loading,
  searchLocationWeather: (state) => state.searchLocationWeather,
  searchLocationWeatherDetailed: (state) => state.searchLocationWeatherDetailed,
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
