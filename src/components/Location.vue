<template>
    <!-- Card -->
    <div class="col-4">
        <div class="card shadow-sm">
            <!-- Reload -->
            <div class="card-header d-flex justify-content-end">                
                <span v-on:click="reloadLocation()">    
                    <i class="fas fa-sync"></i>
                </span>    
            </div>
            <div class="card-body">
                <!-- Titulo -->
                <h5 class="card-title">API Location: <i class="small">cuántas veces aparece la letra "l"</i></h5>
                <!-- Mostrar cantidad de resultados -->
                <p class="card-text">Cantidad: <strong>{{ this.cantidad }}</strong></p>
                <!-- Mostrar tiempo de ejecución -->
                <p class="card-text">Tiempo ejecución: <strong>{{ this.tiempo_ejecucion.toFixed(2) }}s ({{ this.tiempo_ejecucion.toFixed(4) }}ms)</strong></p>
                <!-- Mensaje error -->
                <p class="card-text small text-danger" v-if="error">Hubo un error en la ejecución.</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	methods: {
        // Consulto API
		obtenerLocation: function () {
            // Inicio "cronómetro" sólo en "page" inicial, y que no se sobreescriba el timer
            if(this.pagina === 1){
                this.tiempo_inicio = window.performance.now()
            }            
            // Limpio array de location
            this.respuesta_location = []

			this.axios.get(this.apiLocation+'/?page=' + this.pagina, { 
            }).then(response => {
                // Determino si la API devuelve más "pages" en "next"
                this.next = response.data.info.next             
                // Guardo la respuesta de los location
                this.respuesta_location = response.data.results
                // Recorro array y busco coincidencias
                this.respuesta_location.forEach(element => {
                    let coincidencia = (element.name.toLowerCase().match(/l/g) || []).length
                    this.cantidad += coincidencia
                })                         
                // Continuo si "next" es distinto de null
                if(this.next){                      
                    // Seteo siguiente pagina y vuelvo a ejecutar API
                    this.pagina++
                    this.obtenerLocation()
                } else {
                    // Termino "cronómetro"
                    this.tiempo_termino = window.performance.now()       
                    // Seteo valor en tiempo de ejecución
                    this.tiempo_ejecucion = (this.tiempo_termino - this.tiempo_inicio) / 1000
                }
            })
            .catch(error => {
                console.log(error.response)     
                // Limpio variables
                this.respuesta_location = []    
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
            this.respuesta_location = []
        },
        // Reload de API
        reloadLocation: function(){
            // Limpio valores
            this.limpiarValores()
            // Ejecuto API 
            this.obtenerLocation()
        }
	},
	mounted () {
        // Ejecuto la API una vez se construya el componente
        this.obtenerLocation()
	},
	data () {
		return {
            // Variables donde contendré la respuesta de la API
            respuesta_location: [],
            next: null,
            // Variable cantidad de veces que se repite letra l
            cantidad: 0,
            // Tiempo de ejecución
            tiempo_ejecucion: 0,
            tiempo_inicio: 0,
            tiempo_final: 0,
            // Pagina inicial de resultados
            pagina: 1,
            // Error ejecucion
            error: false
		}
	},
	computed: {
        ...mapState(['apiLocation'])
	}
}
</script>
