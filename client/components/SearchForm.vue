<template>
  <div id="searchForm" class="form-inline align-self-center">
    <div class="form-group mx-sm-3 mb-2">
      <label for="inputPassword2" class="sr-only">Search </label>
      <input type="text" class="form-control" id="search" v-model="searchText" placeholder="Search Location Weather">
    </div>
    <button type="submit" class="btn btn-primary mb-2" @click="searchLocationWeather" >Search</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      searchText: '',
    }
  },
  methods: {
    searchLocationWeather () {
      this.onSearch(this.searchText)
    }
  },
  props: ['onSearch'],
}
</script>

<style>
#searchForm {
  margin: 0 auto;
}
</style>

