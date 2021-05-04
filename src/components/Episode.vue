<template>
    <!-- Card -->
    <div class="col-4">
        <div class="card">
            <div class="card-body">
                <!-- Titulo -->
                <h5 class="card-title">API Episode: <i class="small">cuántas veces aparece la letra "e"</i></h5>
                <!-- Mostrar cantidad de resultados -->
                <p class="card-text">Cantidad: <strong>{{ this.cantidad }}</strong></p>
                <!-- Mostrar tiempo de ejecución -->
                <p class="card-text">Tiempo ejecución: <strong>{{ this.tiempo_ejecucion.toFixed(2) }}s ({{ this.tiempo_ejecucion.toFixed(4) }}ms)</strong></p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	methods: {
        // Consulto API
		obtenerEpisode: function () {
            // Limpio array de episodes
            this.respuesta_episode = []
            // Declaro variables para performance
            let tiempoInicio, tiempoTermino

            // Inicio "cronómetro"
            tiempoInicio = window.performance.now()

			this.axios.get(this.apiEpisode+'/?page=' + this.pagina, { 
            }).then(response => {
                // Determino si la API devuelve más "pages" en "next"
                this.next = response.data.info.next
                // Continuo si "next" es distinto de null
                if(this.next){                    
                    // Guardo la respuesta de los episode
                    this.respuesta_episode = response.data.results
                    // Recorro array y busco coincidencias
                    this.respuesta_episode.forEach(element => {
                        let coincidencia = (element.name.toLowerCase().match(/e/g) || []).length
                        this.cantidad += coincidencia
                    })                    
                    // Seteo siguiente pagina y vuelvo a ejecutar API
                    this.pagina++
                    this.obtenerEpisode()
                } else {
                    // Termino "cronómetro"
                    tiempoTermino = window.performance.now()                    
                    // Seteo valor en tiempo de ejecución
                    this.tiempo_ejecucion = (tiempoTermino - tiempoInicio) / 1000
                }
            })
            .catch(error => {
                console.log(error.response)         
                // Limpio variables
                this.respuesta_episode = []    
                this.cantidad = 0
                this.next = null
                this.pagina = 1
                // Termino "cronómetro"
                tiempoTermino = window.performance.now()
                // Seteo valor en tiempo de ejecución
                this.tiempo_ejecucion = (tiempoTermino - tiempoInicio) / 1000
            })
		}
	},
	mounted () {
        // Ejecuto la API una vez se construya el componente
        this.obtenerEpisode()
	},
	data () {
		return {
            // Variables donde contendré la respuesta de la API
            respuesta_episode: [],
            next: null,
            // Variable cantidad de veces que se repite letra e
            cantidad: 0,
            // Tiempo de ejecución
            tiempo_ejecucion: 0,
            // Pagina inicial de resultados
            pagina: 1
		}
	},
	computed: {
        ...mapState(['apiEpisode'])
	}
}
</script>
