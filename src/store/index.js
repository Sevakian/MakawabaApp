import Vue from 'vue'
import Vuex from 'vuex'

import timestats from './modules/timestats'
import calendar from './modules/calendar'
import gaming from './modules/gaming'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    timestats,
    calendar,
    gaming,
  }
})
