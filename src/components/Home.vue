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
    <div class="row mt-4">      
      <!-- Card con episode / location -->
      <EpisodeLocation/>
    </div>
  </div>
</template>

<script>
// Importo los componentes
import Location from '@/components/Location'
import Episode from '@/components/Episode'
import Character from '@/components/Character'
import EpisodeLocation from '@/components/EpisodeLocation'

export default {
	mounted () {},
	data () {
		return {}
	},
	components: {	
    Location,
    Episode,
    Character,
    EpisodeLocation
	}
}
</script>