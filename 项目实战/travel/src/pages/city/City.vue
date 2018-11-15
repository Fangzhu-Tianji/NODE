<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
  </div>
</template>

<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import axios from 'axios'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch
  },
  data () {
    return {
      hotCities: '',
      cities: ''
    }
  },
  mounted () {
    this.getCityInfo();
  },
  methods: {
    getCityInfo () {
      axios.get('/api/city.json')
        .then(this.getCityInfoSucc)
    },
    getCityInfoSucc (response) {
      const res = response.data
      if (res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
        this.cities = data.cities
        console.log(this.cities)
      }
    }
  }
}
</script>

