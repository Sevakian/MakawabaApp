import gamingRequests from './../../../httprequest/gamingRequests'
import moment from 'moment'

export default {
    state: {
      games: [],

      selectedGame: [{
        Spielid: '',
        Spielename: '',
        Spieleserie: '',
        Genre: '',
        Erscheinungsjahr: '',
        Entwickler: '',
        Dimension: '',
        Bild: '',
        Status: '',
        AnzahlVerkauft: '',
        Text: '',
        GrößeGB: '',
        konsoles: []
    }],

    },
    getters: {
      getSelectedGame: state => {
        return state.selectedGame
      },

      getGames: state => {
        return state.games
      }
    },
    mutations: {
      setGame(state, inGame){
        if(inGame == null){
          state.selectedGame = [{
            Spielid: '',
            Spielename: '',
            Spieleserie: '',
            Genre: '',
            Erscheinungsjahr: '',
            Entwickler: '',
            Dimension: '',
            Bild: '',
            Status: '',
            AnzahlVerkauft: '',
            Text: '',
            GrößeGB: '',
            consoles: []
          }]
        }
        else if(inGame.Spielid != null || inGame.Spielid != ''){
            // state.selectedGame = state.games.filter(x => x.Spielid == inGame.Spielid)
          state.selectedGame = [{
            Spielid: inGame.Spielid,
            Spielename: inGame.Spielename,
            Spieleserie: inGame.Spieleserie,
            Genre: inGame.Genre,
            Erscheinungsjahr: inGame.Erscheinungsjahr,
            Entwickler: inGame.Entwickler,
            Dimension: inGame.Dimension,
            Bild: inGame.Bild,
            Status: inGame.Status,
            AnzahlVerkauft: inGame.AnzahlVerkauft,
            Text: inGame.Text,
            GrößeGB: inGame.GrößeGB,
            consoles: inGame.consoles
          }]
        }


      },
      setAllGames(state, inGames){
        state.games = inGames
      }
    },
    actions: {
      async selectGame({commit}, inGame){
        commit("setGame", inGame)
      },

      async saveGame({dispatch}, toGame){
        if(toGame.id != null){
          await gamingRequests.updateGame(toGame)
        } else if(toGame.id == "" || toGame.id == null){
          await gamingRequests.addGame(toGame)
        }
        dispatch('getAllGames')
      },

      async getAllGames({commit, dispatch}){
        let results = await gamingRequests.getGames()
        for(let i = 0; i < results.length;i++){
          if(results[i].Erscheinungsjahr != null){
              results[i].Erscheinungsjahr = moment(results[i].Erscheinungsjahr).format('YYYY-MM-DD')
          }
      }
        await commit('setAllGames', results)
        dispatch('orderList', results)
      }
    },

  }
  