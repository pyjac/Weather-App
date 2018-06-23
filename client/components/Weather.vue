<template>
  <div class="card">
    <img class="card-img-top" :src="data.weatherIcon" alt="Card image cap">
    <div class="card-body text-center">
      <h5 class="card-title">{{ data.cityName }}</h5>
      <h2>{{ data.temperature }}°C</h2>
      <p>Max: {{ data.maxTemperature}}°C</p>
      <p>Min: {{ data.minTemperature}}°C</p>
    </div>
  </div>
</template>


<script>

export default {
  props: ['data']
}
</script>
<style>
.card {
  border: none;
  width: 13rem;
  margin: 0 auto;
}
</style>

