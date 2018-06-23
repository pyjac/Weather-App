<template>
<div class="container">
  <div class="row align-items-center">
    <div class="col">
      <h3 class="text-center">Search woeid: {{ searchWoeid }}</h3>
    </div>
  </div>
  <div v-if="loading">
    Loading
  </div>
  <div class="row align-items-center" v-else>
    <div v-if="searchLocationWeatherDetailed.length > 0" class="col">
      <div class="row">
        <div class="col-sm-4 col-md-4" v-for="weather in searchLocationWeatherDetailed">
          <h4 class="text-center">{{ weather.dayOfWeek }} </h4>
          <weather :data="weather" />
        </div>
      </div>
    </div>
    <div v-else>
      No results were found. Try changing the keyword!
    </div>
  </div>
  <div class="row">
    <search-form :onSearch="onSearch" />
  </div>
</div>
</template>

<script>
import Weather from "components/Weather"
import SearchForm from "components/SearchForm"
import { mapActions, mapGetters } from "vuex"
export default {
  data: function () {
    return {
      searchWoeid: this.$route.params.woeid,
    }
  },
  components: {
    Weather,
    SearchForm
  },
  methods: {
    onSearch (searchWoeid) {
      this.searchWoeid = searchWoeid
      this.$router.replace({ name: 'weather-detailed', params: { woeid: searchWoeid}})
      this.fetchLocationWeatherDetailed(searchWoeid)
    },
    ...mapActions(["fetchLocationWeatherDetailed"])
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      searchLocationWeatherDetailed: 'searchLocationWeatherDetailed'
    })
  },
  created: function () {
    const searchWoeid = this.$route.params.woeid;
    if (!searchWoeid) {
      this.$router.push({path: '/'})
    }
    this.fetchLocationWeatherDetailed(searchWoeid)
  }
}
</script>
