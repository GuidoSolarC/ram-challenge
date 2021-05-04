<template>
  <div class="content">
    <div class="row">
      <!-- Card de location -->
      <Location/>
      <!-- Card de Episode -->
      <Episode/>
      <!-- Card de Character -->
      <Character/>
    </div>     
  </div>
</template>

<script>
// Importo los componentes
import Location from '@/components/Location'
import Episode from '@/components/Episode'
import Character from '@/components/Character'

export default {
	mounted () {},
	data () {
		return {}
	},
	components: {	
    Location,
    Episode,
    Character
	}
}
</script>