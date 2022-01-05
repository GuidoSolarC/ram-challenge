<template>
    <!-- Card -->
    <div class="col-4">
        <div class="card shadow-sm">
            <!-- Reload -->
            <div class="card-header d-flex justify-content-end">    
                <span class="icon-reload" v-on:click="reloadCharacter()">    
                    <i class="fas fa-sync"></i>
                </span>        
            </div>
            <div class="card-body">
                <!-- Titulo -->
                <h5 class="card-title">API Character</h5>
                <p class="card-text"><em>Cuántas veces aparece la letra "c" en los nombres de todos los <span class="tag">character</span></em></p>
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
		obtenerCharacter: function () {
             // Inicio "cronómetro" sólo en "page" inicial, y que no se sobreescriba el timer
            if(this.pagina === 1){
                this.tiempo_inicio = window.performance.now()
            }            
            // Limpio array de character
            this.respuesta_character = []
            var optionAxios = {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
			this.axios.get(this.apiCharacter+'/?page=' + this.pagina, { 
                optionAxios
            }).then(response => {
                // Determino si la API devuelve más "pages" en "next"
                this.next = response.data.info.next               
                // Guardo la respuesta de los character
                this.respuesta_character = response.data.results
                // Recorro array y busco coincidencias
                this.respuesta_character.forEach(element => {
                    let coincidencia = (element.name.toLowerCase().match(/c/g) || []).length
                    this.cantidad += coincidencia
                })                                     
                // Continuo si "next" es distinto de null
                if(this.next){     
                    // Seteo siguiente pagina y vuelvo a ejecutar API
                    this.pagina++
                    this.obtenerCharacter()
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
                this.respuesta_character = []    
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
            this.respuesta_character = []
        },
        // Reload de API
        reloadCharacter: function(){
            // Limpio valores
            this.limpiarValores()
            // Ejecuto API 
            this.obtenerCharacter()
        }
	},
	mounted () {
        // Ejecuto la API una vez se construya el componente
        this.obtenerCharacter()
	},
	data () {
		return {
            // Variables donde contendré la respuesta de la API
            respuesta_character: [],
            next: null,
            // Variable cantidad de veces que se repite letra c
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
        ...mapState(['apiCharacter'])
	}
}
</script>
