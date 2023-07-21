import calendarRequests from './../../../httprequest/calendarRequests'
// import moment from 'moment'

export default {
    state: {
        verwendungen: [],
        filterVerwendungen: [],      
    },
    getters: {
        getVerwendungen: state => {
            return state.verwendungen
        },
    },
    mutations: {
        setVerwendungen(state, inResult){
            state.verwendungen = inResult;
        },
    
    },
    actions: {
        async getVerwendungen({commit}){
            var result = await calendarRequests.getVerwendung();
            commit('setVerwendungen', result);
        },       
    },

  }
  