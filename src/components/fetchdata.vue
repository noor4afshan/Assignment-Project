<template>
    
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
     fetchedData: [],
      };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://randomuser.me/api/?results=1000")
        .then((response) => {
          this.fetchedData = response.data.results;
          
          console.log(this.fetchedData)
          
          localStorage.setItem('fetchData', JSON.stringify(this.fetchedData));
        })
        
    },
  },
  
};
</script>