import timestatRequests from '../../../httprequest/timestatRequests'

export default {
    state: {
        allTables: [],
        selectedTable: "",
    },
    getters: {
        getTables: state => {
            return state.allTables
        },
        getSelectedTable: state => {
            return state.selectedTable
        }
    },
    mutations: {
        setTables(state, inResult){
            let dateTables = [];
            for(var i = 0; i < inResult.length;i++){
                dateTables[i] = Object.values(inResult[i]).toString();
            }

            state.allTables = dateTables;
        },
        selectTable(state, inTable){
            state.selectedTable = inTable;
        },
    },
    actions: {
        async selectTable({commit, dispatch, getters}, inTable){

            if(inTable != getters.getSelectedTable){
                commit("selectTable", inTable);
                dispatch("getAllDates", inTable)
                dispatch('selectDays','')
            } else {
                return
            }

        },

        async getTables({commit}){
            var result = await timestatRequests.getTables()
            commit('setTables', result)
        },

        async saveTable({dispatch, getters}, newTable){
            if(getters.getTables.filter(x => x == newTable).length == 0){
                await timestatRequests.newTable(newTable);
                dispatch('getTables')
            }
            else if (getters.getTables.filter(x => x == newTable).length > 0){
                return alert("Name vorhanden")
            }
        },

        async updateTable({dispatch, commit, getters}, inTable){
            if(getters.getTables.filter(x => x == inTable.newName).length == 0){
                await timestatRequests.updateTable(inTable)
                dispatch('getTables');
                commit('selectTable', inTable.newName)
            }
            else if (getters.getTables.filter(x => x == inTable.newName).length > 0){
                return alert("Name Vorhanden")
            }
        },

        async dropTable({dispatch, commit}, table){
            await timestatRequests.dropTable(table);
            dispatch('getTables')
            dispatch('getAllDates', '')
            commit('selectTable', '')
        }
    },
  }
  