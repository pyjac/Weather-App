<template>
  <div class="page">
    <div class="row">
      <div class="col-sm-4 col-md-4" v-for="weather in weatherData">
        <weather :data="weather" />
      </div>
    </div>
    <div class="row">
      <search-form :onSearch="searchLocationWeather" />
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
      weatherData: "homeWeatherData"
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
#searchForm {
  margin: 0 auto;
}
</style>
