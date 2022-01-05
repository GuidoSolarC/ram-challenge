<template>
    <!-- Card -->
    <div class="col-12">
        <div class="card shadow-sm">
            <!-- Reload -->
            <div class="card-header d-flex justify-content-end">                
                <span class="icon-reload" v-on:click="reloadEpisodes()">    
                    <i class="fas fa-sync"></i>
                </span>    
            </div>
            <div class="card-body">
                <!-- Titulo -->
                <h5 class="card-title">Episode/Location</h5>                
                <p class="card-text"><em>Cantidad y listado con las 
                    <span class="tag">location</span> (<span class="tag">origin</span>) 
                    de todos los <span class="tag">characters</span> de cada <span class="tag">episode</span> (sin repetir)</em>
                </p>
                <!-- Mostrar cantidad de resultados -->
                <p class="card-text">Cantidad: <strong>{{ this.cantidad }}</strong></p>
                <!-- Mostrar tiempo de ejecución -->
                <p class="card-text">Tiempo ejecución: <strong>{{ this.tiempo_ejecucion.toFixed(2) }}s ({{ this.tiempo_ejecucion.toFixed(4) }}ms)</strong></p>
                <!-- Mensaje error -->
                <p class="card-text small text-danger" v-if="error">Hubo un error en la ejecución.</p>
                <!-- Listado -->
                <div class="row">
                    <div class="col-6">
                        <ul v-for="item in origin_array" v-bind:key="item">
                            <li>{{ item }}</li>
                        </ul>
                    </div>
                </div>
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
            
            // Inicio "cronómetro" sólo en "page" inicial, y que no se sobreescriba el timer
            if(this.pagina === 1){
                this.tiempo_inicio = window.performance.now()
            }            
            // Limpio array de episode
            this.respuesta_episode = []

            // Array con personajes no repetidos
            var charactersUrl = []
            var optionAxios = {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
			this.axios.get(this.apiEpisode+'/?page=' + this.pagina, { 
                optionAxios
            }).then(response => {
                // Determino si la API devuelve más "pages" en "next"
                this.next = response.data.info.next                    
                // Guardo la respuesta de los episode
                this.respuesta_episode = response.data.results    
                this.respuesta_episode.forEach(element => {
                    // Contengo array de characters del episodio
                    let chapter_characters = element.characters
                    // Obtengo cada url API de character
                    chapter_characters.forEach(url_character => {
                        // Busco si personaje ya se encuentra en array
                        if (charactersUrl.indexOf(url_character) === -1) {
                            // Guardo en array
                            charactersUrl.push(url_character)                        
                        }
                    })
                })                   
                
                // Continuo si "next" es distinto de null
                if(this.next){           
                    // Seteo siguiente pagina y vuelvo a ejecutar API
                    this.pagina++
                    this.obtenerEpisode()
                } else {
                    // Luego de obtener el listado unico de personajes sin repetir, busco sus origin
                    charactersUrl.forEach(urlApi => {
                        this.obtenerOriginCharacter(urlApi)                    
                    })
                }         
            })
            .catch(error => {
                console.log(error.response)         
               
            })
		},
        // En base a la URL API de cada character, busco su origin
        obtenerOriginCharacter: function(urlApi){
			var optionAxios = {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
            this.axios.get(urlApi, { 
				optionAxios
            }).then(response => {
                // Contengo lo encontrado para cada character
                let origen_character = response.data.origin.name
                // Busco si elemento ya está en array, de ser asi, se omite, caso contrario se agrega
                if (this.origin_array.indexOf(origen_character) === -1) {
                    // Guardo origen en array
                    this.origin_array.push(origen_character)
                    // Sumo cantidad
                    this.cantidad++
                }              
                // Termino "cronómetro"
                this.tiempo_termino = window.performance.now()       
                // Seteo valor en tiempo de ejecución
                this.tiempo_ejecucion = (this.tiempo_termino - this.tiempo_inicio) / 1000
            })
            .catch(error => {
                console.log(error.response) 
                // Limpio variables
                this.respuesta_episode = []    
                this.cantidad = 0
                this.next = null
                this.pagina = 1
                // Termino "cronómetro"
                this.tiempo_termino = window.performance.now()
                // Seteo valor en tiempo de ejecución
                this.tiempo_ejecucion = (this.tiempo_termino - this.tiempo_inicio) / 1000
                // Error
                this.error = true
            })
        },
        // Reseteo valores para volver a ejecutar API
        limpiarValores: function(){
            this.cantidad = 0
            this.next = null
            this.pagina = 1
            this.tiempo_inicio = 0
            this.tiempo_final = 0
            this.tiempo_ejecucion = 0
            this.error = false
            this.respuesta_episode = []
            this.origin_array = []
        },
        // Reload de API
        reloadEpisodes: function(){
            // Limpio valores
            this.limpiarValores()
            // Ejecuto API 
            this.obtenerEpisode()
        }
	},
	mounted () {
        // Ejecuto al construir componente
        this.obtenerEpisode() 
	},
	data () {
		return {
            // Variables donde contendré la respuesta de la API
            respuesta_episode: [],
            next: null,
            // Pagina inicial de resultados
            pagina: 1,
            // Listado de origin de characters
            origin_array: [],
            cantidad: 0,
            // Tiempo de ejecución
            tiempo_ejecucion: 0,
            tiempo_inicio: 0,
            tiempo_final: 0,
            // Error ejecucion
            error: false
		}
	},
	computed: {
        ...mapState(['apiEpisode'])
	}
}
</script>