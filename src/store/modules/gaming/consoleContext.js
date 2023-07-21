import gamingRequests from './../../../httprequest/gamingRequests'
import moment from 'moment'

export default {
    state: {
      consoles: [],

      selectedConsole: [{
        Konsoleid: '',
        KonsoleName: '',
        Bild: '',
        Hersteller: '',
        Erscheinungsjahr: '',
        Generation: '',
        Status: '',
        Typ: '',
        AnzahlVerkauft: '',
        Text: '',

    }],
    },
    getters: {
      getSelectedConsole: state => {
        return state.selectedConsole
      },

      getConsoles: state => {
        return state.consoles
      }
    },
    mutations: {
      setConsole(state, inConsole){
        if(inConsole == null){
          state.selectedConsole = [{
            Konsoleid: '',
            KonsoleName: '',
            Bild: '',
            Hersteller: '',
            Erscheinungsjahr: '',
            Generation: '',
            Status: '',
            Typ: '',
            AnzahlVerkauft: '',
            Text: '',
          }]
        }
        else if(inConsole.Konsoleid != null || inConsole.Konsoleid != ''){
          state.selectedConsole = [{
            Konsoleid: inConsole.Konsoleid,
            KonsoleName: inConsole.KonsoleName,
            Bild: inConsole.Bild,
            Hersteller: inConsole.Hersteller,
            Erscheinungsjahr: inConsole.Erscheinungsjahr,
            Generation: inConsole.Generation,
            Status: inConsole.Status,
            Typ: inConsole.Typ,
            AnzahlVerkauft: inConsole.AnzahlVerkauft,
            Text: inConsole.Text,
        }]
        }
              // state.selectedKonsole = state.konsoles.filter(x => x.Konsoleid == id)
      },
      setAllConsoles(state, inConsoles){
        state.consoles = inConsoles
      }
    },
    actions: {
      async selectConsole({commit}, inConsole){
        commit("setConsole", inConsole)
      },
      async saveConsole({dispatch}, toConsole){
        if(toConsole.id != null){
            await gamingRequests.updateConsole(toConsole)
        } else if(toConsole.id == "" || toConsole.id == null){
          await gamingRequests.addConsole(toConsole)
        }
        dispatch('getAllConsoles')
      },

      async getAllConsoles({commit, dispatch}){
        let results = await gamingRequests.getConsoles()
        for(let i = 0; i < results.length;i++){
          if(results[i].Erscheinungsjahr != null){
              results[i].Erscheinungsjahr = moment(results[i].Erscheinungsjahr).format('YYYY-MM-DD')
          }
      }
        await commit('setAllConsoles', results)
        dispatch('orderConsoleList', results)

      }
    },

  }
  