import calendarRequests from './../../../httprequest/calendarRequests'

export default {
    state: {
        selectedTable: "",
        calendarTables: [],
    },
    getters: {
        getTables: state => {
            return state.calendarTables;
        },
        getSelectedTable: state => {
            return state.selectedTable
        },
    },
    mutations: {
        setTable(state, inTable){
            state.selectedTable = inTable;
        },

        setAllTables(state, inResult){
            let calendarTables = [];
            for(var i = 0; i < inResult.length;i++){
                calendarTables[i] = Object.values(inResult[i]).toString();
            }
            state.calendarTables = calendarTables;
        },
    },
    actions: {
        //Tabelle
        async selectTable({commit, dispatch}, inTable){
            commit("setTable", inTable);
            dispatch("getAllDates", inTable)
        },

        async setNewTable({dispatch}, newTable){
            console.log(newTable);
            await calendarRequests.newTable(newTable);
            dispatch('getTables')
        },

        async getTables({commit}){
            var result = await calendarRequests.getTables();
            console.log(result);
            commit("setAllTables", result);
        },
    },
  }
  