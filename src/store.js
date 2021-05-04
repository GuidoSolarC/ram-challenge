import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// API de location
        apiLocation: 'https://rickandmortyapi.com/api/location/',
        // API de episode
        apiEpisode: 'https://rickandmortyapi.com/api/episode/',
        // API de character
        apiCharacter: 'https://rickandmortyapi.com/api/character/'
	},
	mutations: {},
	actions: {},
	getters: {}
})