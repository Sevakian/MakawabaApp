import moment from 'moment'
export default {
    state: {
      gameList: [],
      listLength: 0,

      order: "lastAdded",
      valueFilter: "",
      dimensionFilter: "any",
      consoleFilter: [],
      statusFilter: [],
    },
    getters: {
      getLength: state => {
        return state.listLength
      },
      getGameList: state => {
        let gamesList_0 = state.gameList
        let gamesList_1 = [];
        let gamesList_2 = [];
        let gamesList_3 = [];
        let gamesList_4 = [];
 
        let index = 0;

        if(state.consoleFilter.length != 0){
            for(let c = 0; c < gamesList_0.length; c++){
               if(gamesList_0[c].consoles.some((val) => state.consoleFilter.indexOf(val) !== -1)){
                   gamesList_1[index] = gamesList_0[c];
                   index++;
               }
            }
        }
        else if(state.consoleFilter.length == 0){
            gamesList_1 = gamesList_0;
        }
        index = 0;
        if(state.valueFilter != '' || state.valueFilter.length != 0){

            for(let i = 0; i < state.valueFilter.length; i++){
              for(let j = 0; j < gamesList_1.length; j++){
                if(gamesList_1[j].Spieleserie == null){
                    gamesList_1[j].Spieleserie = '';
                }
                if(gamesList_1[j].Genre == null){
                    gamesList_1[j].Genre = '';
                }
                if(gamesList_1[j].Entwickler == null){
                    gamesList_1[j].Entwickler = '';
                }
                if(
                    gamesList_1[j].Spielename.toLowerCase().includes(state.valueFilter[i].toLowerCase()) ||
                    gamesList_1[j].Spieleserie.toLowerCase().includes(state.valueFilter[i].toLowerCase()) ||
                    gamesList_1[j].Genre.toLowerCase().includes(state.valueFilter[i].toLowerCase()) ||
                    gamesList_1[j].Entwickler.toLowerCase().includes(state.valueFilter[i].toLowerCase()) 
                    ){
                  gamesList_2[index] = gamesList_1[j];
                  index++;
                }
              }
            }
            gamesList_2 = [...new Set(gamesList_2)];
        }
        else if(state.valueFilter == '' || state.valueFilter.length == 0){
            gamesList_2 = gamesList_1
        }
        index = 0;
        if(state.statusFilter.length != 0){
            for(let j = 0; j < state.statusFilter.length; j++){
                for(let i = 0; i < gamesList_2.length; i++){

                    if(gamesList_2[i].Status == null){
                        gamesList_2[i].Status = '';
                    }
                    if(gamesList_2[i].Status.toLowerCase() == state.statusFilter[j].toLowerCase()){
                        gamesList_3[index] = gamesList_2[i];
                        index++;
                    }
                }
            }
            gamesList_3 = [...new Set(gamesList_3)]
        }
        else if(state.statusFilter.length == 0){
            gamesList_3 = gamesList_2
        }
        if(state.dimensionFilter != 'any'){
          if(state.dimensionFilter == '3d'){
            gamesList_4 = gamesList_3.filter(x => x.Dimension == '3D')
          }
          if(state.dimensionFilter == '2d'){
            gamesList_4 = gamesList_3.filter(x => x.Dimension == '2D')
          }
          if(state.dimensionFilter == 'empty'){
            gamesList_4 = gamesList_3.filter(x => x.Dimension == null)
          }
        }
        else if(state.dimensionFilter == 'any'){
          gamesList_4 = gamesList_3
        }
        state.listLength = gamesList_4.length 

        return gamesList_4;
      },

      getOrder: state => {
        return state.order
      }
    },
    mutations: {
      setGameList(state, inValue){
        state.gameList = inValue
      },
      setOrder(state, inValue){
        state.order = inValue
      },
      setDimensionFilter(state, inValue){
        state.dimensionFilter = inValue
      },
      setConsoleFilter(state, inConsole){
        state.consoleFilter = inConsole
      },
      setStatusFilter(state, inStatus){
        state.statusFilter = inStatus
      },
      setValueFilter(state, inValue){
        state.valueFilter = inValue
      }
    },
    actions: {
      async orderData({commit, dispatch, getters}, inValue){
        await commit("setOrder", inValue)
        dispatch('orderList', getters.getGames)
      },
      filterByDimension({commit}, inValue){
        commit('setDimensionFilter', inValue)
      },
      filterByValue({commit}, inValue){
        commit("setValueFilter", inValue)
      },
      filterByConsole({commit}, inConsole){
        commit("setConsoleFilter", inConsole)
      },
      filterByStatus({commit}, inStatus){
        commit("setStatusFilter", inStatus)
      },
      orderList({commit, getters}, inResults){
        let order = getters.getOrder 

        if(order == 'lastAdded'){
          inResults = inResults.sort((a,b) => b.Spielid - a.Spielid)
        }
        if(order == 'firstAdded'){
          inResults = inResults.sort((a,b) => a.Spielid - b.Spielid)
        }
        if(order == 'releasedASC'){
          inResults = inResults.filter(x => x.Erscheinungsjahr != null)
          inResults = inResults.sort((a,b) => moment(b.Erscheinungsjahr).format('X') - moment(a.Erscheinungsjahr).format('X'))
        }
        if(order == 'releasedDESC'){
          inResults = inResults.filter(x => x.Erscheinungsjahr != null)
          inResults = inResults.sort((a,b) => moment(a.Erscheinungsjahr).format('X') - moment(b.Erscheinungsjahr).format('X'))
        }
        if(order == 'selledUnits'){
          inResults = inResults.filter(x => x.AnzahlVerkauft != null)
          inResults = inResults.sort((a,b) => parseInt(b.AnzahlVerkauft.replaceAll('.', '')) - parseInt(a.AnzahlVerkauft.replaceAll('.', '')))  
        }
        commit('setGameList', inResults)
      }
    },
  }
  // Filter Konsole
  // Filter by Status
  // Filter word -> Spielename, SpieleSerie, Genre, Entwickler
  // Filter Dimension
  
  // Filter by Datum or Zuletzt hinzugefügt
  // filter by Anzahlverkauft

  // Ohne Konsole // Ohne Datum etc