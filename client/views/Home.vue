<template>
  <div class="page container">
    <div class="row">
      <search-form :onSearch="searchLocationWeather" />
    </div>
    <div class="row" v-if="loading">
      <div class="col-sm-4 col-md-4">
        loading
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-4 col-md-4" v-for="weather in weatherData">
        <weather :data="weather" />
      </div>
    </div>
  </div>
</template>

<script>
import Weather from "components/Weather";
import SearchForm from "components/SearchForm";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Weather,
    SearchForm
  },
  computed: {
    ...mapGetters({
      weatherData: "homeWeatherData",
      loading: 'loading'
    })
  },
  methods: {
    searchLocationWeather (searchText) {
      this.$router.push({ name: 'search', params: { keyword: searchText}})
    },
    ...mapActions(["fetchHomeWeather"])
  },
  created: function() {
    return this.fetchHomeWeather();
  }
};
</script>

<style>
.page {
  margin: 20px 0;
}
</style>
