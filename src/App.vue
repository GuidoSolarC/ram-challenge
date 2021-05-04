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
    background: rgb(32, 35, 41)!important;
    padding: 3rem 4rem;
  }
  /* Estilo para las tarjetas */
  .card{
    background: rgb(60, 62, 68)!important;
  }
  .card-title, .card-text, li, .icon-reload, .lead{
    color: rgb(245, 245, 245)!important;
  }
  .icon-reload{
    cursor: pointer;
  }
  /* Tomé prestado su estilo jeje */ 
  .tag{
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace!important;
    line-height: normal;
    background: rgba(135,131,120,0.15);
    color: #EB5757;
    border-radius: 3px;
    font-size: 85%;
    padding: 0.2em 0.4em;
  }
</style>