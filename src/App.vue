<template>
  <div id="app">
    <p class="lead">
      Rick & Morty Challenge - Guido Solar
    </p>
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
<style>
  body{
    background: #eeeeee;
    padding: 3rem 4rem;
  }
</style>