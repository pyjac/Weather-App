import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const serverPath = 'http://127.0.0.1:9003/weather.php?command='

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const getDayOfWeek = (date) => days[ (new Date(date)).getDay()]

const serializeConsolidatedWeatherData = (consolidatedWeatherData) => ({
  temperature: parseInt(consolidatedWeatherData.the_temp, 10),
  maxTemperature: parseInt(consolidatedWeatherData.max_temp, 10),
  minTemperature: parseInt(consolidatedWeatherData.min_temp, 10),
  weatherIcon: `https://www.metaweather.com/static/img/weather/png/${consolidatedWeatherData.weather_state_abbr}.png`
})

const serializeWeatherData = (weatherData) => ({
  cityName: weatherData.title,
  ...serializeConsolidatedWeatherData(weatherData.consolidated_weather[0])
})

const serializeWeatherDataDetialed = (weatherData) => weatherData.consolidated_weather.map(dayWeather => ({
  cityName: weatherData.title,
  dayOfWeek: getDayOfWeek(dayWeather.applicable_date),
  ...serializeConsolidatedWeatherData(dayWeather)
}))

const getLocationWeather = (woeid) => {
  return Vue.http.get(`${serverPath}location&woeid=${woeid}`).then((response) => serializeWeatherData(response.body))
}
const getLocationWeatherDetailed = (woeid) => {
  return Vue.http.get(`${serverPath}location&woeid=${woeid}`).then((response) => serializeWeatherDataDetialed(response.body))
}

const searchLocationWeather = (keyword) => {
  return Vue.http.get(`${serverPath}search&keyword=${keyword}`).then((response) => response.body)
}

export default {
  getLocationWeather,
  searchLocationWeather,
  getLocationWeatherDetailed
}
