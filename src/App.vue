<script setup>
import Fetchdata from './components/fetchdata.vue';
components: {
  Fetchdata
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-success text-white fixed-top">
    <div class="container-fluid">
      <h3>User List</h3>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn text-white btn-outline-danger" type="submit">Search</button>
      </form>
    </div>
  </nav>

  <fetchdata />
  <router-view />
</template>

<style scoped></style>
