import dataContext from './timestats/dataContext'
import dataView from './timestats/dataView'
import tables from './timestats/tables'
export default {
  namespaced: true, 
  
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    dataContext,
    dataView,
    tables
  }
}

// missing 
// state: timelinesum, addedDate, maxLength
// getters: getMaxLength
// mutations: setDate (addeddate) / setLength
// actions: setMaxLength