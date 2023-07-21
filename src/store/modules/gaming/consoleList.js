import moment from 'moment'
export default {
    state: {
      consoleList: [],
      listLength: 0,

      consoleOrder: "lastAdded",
      consoleValue: "",
      consoleStatus: [],
    },
    getters: {
      getConsoleLength: state => {
        return state.listLength
      },
      getConsoleList: state => {
        let consoleList_1 = state.consoleList
        let consoleList_2 = [];
        let consoleList_3 = [];
 
        let index = 0;

        index = 0;
        if(state.consoleValue != '' || state.consoleValue.length != 0){

            for(let i = 0; i < state.consoleValue.length; i++){
              for(let j = 0; j < consoleList_1.length; j++){
                if(consoleList_1[j].KonsoleName == null){
                    consoleList_1[j].KonsoleName = '';
                }
                if(consoleList_1[j].Hersteller == null){
                    consoleList_1[j].Hersteller = '';
                }
                if(
                    consoleList_1[j].KonsoleName.toLowerCase().includes(state.consoleValue[i].toLowerCase()) ||
                    consoleList_1[j].Hersteller.toLowerCase().includes(state.consoleValue[i].toLowerCase()) 
                    ){
                  consoleList_2[index] = consoleList_1[j];
                  index++;
                }
              }
            }
            consoleList_2 = [...new Set(consoleList_2)];
        }
        else if(state.consoleValue == '' || state.consoleValue.length == 0){
            consoleList_2 = consoleList_1
        }
        index = 0;
        if(state.consoleStatus.length != 0){
            for(let j = 0; j < state.consoleStatus.length; j++){
                for(let i = 0; i < consoleList_2.length; i++){

                    if(consoleList_2[i].Status == null){
                        consoleList_2[i].Status = '';
                    }
                    if(consoleList_2[i].Status.toLowerCase() == state.consoleStatus[j].toLowerCase()){
                        consoleList_3[index] = consoleList_2[i];
                        index++;
                    }
                }
            }
            consoleList_3 = [...new Set(consoleList_3)]
        }
        else if(state.consoleStatus.length == 0){
            consoleList_3 = consoleList_2
        }

        state.listLength = consoleList_3.length 

        return consoleList_3;
      },
      getConsoleOrder: state => {
        return state.consoleOrder
      }
    },
    mutations: {
      setConsoleList(state, inValue){
        state.consoleList = inValue
      },
      setConsoleOrder(state, inValue){
        state.consoleOrder = inValue
      },
      setConsoleStatus(state, inStatus){
        state.consoleStatus = inStatus
      },
      setConsoleValue(state, inValue){
        state.consoleValue = inValue
      }
    },
    actions: {
      async orderConsoleData({commit, dispatch, getters}, inValue){
        await commit("setConsoleOrder", inValue)
        dispatch('orderConsoleList', getters.getConsoles)
      },
      filterConsoleValue({commit}, inValue){
        commit("setConsoleValue", inValue)
      },
      filterConsoleStatus({commit}, inStatus){
        commit("setConsoleStatus", inStatus)
      },
      orderConsoleList({commit, getters}, inResults){
        let order = getters.getConsoleOrder 

        if(order == 'lastAdded'){
          inResults = inResults.sort((a,b) => b.Konsoleid - a.Konsoleid)
        }
        if(order == 'firstAdded'){
          inResults = inResults.sort((a,b) => a.Konsoleid - b.Konsoleid)
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
        commit('setConsoleList', inResults)
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