import moment from "moment"

export default {
    state: {
        gamesForMonths: []
    },
    getters: {
        getGamesForMonths: state => {
            return state.gamesForMonths
        }
    },
    mutations: {
        setGamesForMonths(state, inList){
            let months = [  '01', '02', '03', '04', '05', '06', 
                            '07', '08', '09', '10', '11', '12' ]
            let newList = {}
            for(let i = 0; i < 12; i++){
                let results = inList.filter(x => moment(x.Erscheinungsjahr).format('MM') == months[i])
                newList[i] = {month : months[i], data: results}
            }
            state.gamesForMonths = newList
        }
    },
    actions: {
        gamesForMonths({commit}, inList){
            commit('setGamesForMonths', inList)
        }
    },

  }
  