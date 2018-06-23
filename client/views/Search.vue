<template>
<div class="container">
  <div class="row align-items-center">
    <div class="col">
      <h3 class="text-center">Search keyword: {{ searchKeyword }}</h3>
    </div>
  </div>
  <div v-if="loading">
    Loading
  </div>
  <div class="row align-items-center" v-else>
    <div v-if="searchLocationWeather.cityName" class="col">
      <weather :data="searchLocationWeather" />
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
import Weather from "components/Weather";
import SearchForm from "components/SearchForm";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Weather,
    SearchForm
  },
  data: function () {
    return {
      searchKeyword: this.$route.params.keyword,
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchKeyword = searchText
      this.$router.replace({ name: 'search', params: { keyword: searchText}})
      this.fetchLocationWeather(searchText)
    },
    ...mapActions(["fetchLocationWeather"])
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      searchLocationWeather: 'searchLocationWeather'
    })
  },
  created: function () {
    const searchText = this.$route.params.keyword;
    if (!searchText) {
      this.$router.push({path: '/'})
    }
    this.fetchLocationWeather(searchText)
  }
}
</script>
