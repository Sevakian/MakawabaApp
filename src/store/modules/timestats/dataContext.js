import timestatRequests from "../../../httprequest/timestatRequests";
import moment from 'moment'
// import {formatDate} from './../../../components/general/formatDate'

export default {
    state: {
        allDates: [],
        lastEntry: 0,

        selectedDay: '',
        dataforDay: [],

        selectedDate: [{
            datum_id: '',
            datum: '',
            text: '',
        }],
    },
    getters: {
        getselectedDate: state => {
            return state.selectedDate
        },
        getDataforDay: state => {
            return state.dataforDay
        },
        getSelectedDay: state => {
            return state.selectedDay;
        },
        getAllDates: state => {
            return state.allDates
        },
        getLastEntry: state => {
            return state.lastEntry
        },
    },
    mutations: {
        setDate(state, inData){
            if(inData.datum_id == null){
                state.selectedDate = [{
                    datum_id: '',
                    datum: '',
                    text: '',
                }]
            }
            else if (inData.datum_id != null){
                state.selectedDate = [{
                    datum_id: inData.datum_id,
                    datum: inData.datum,
                    text: inData.text 
                }]
            }
        },
        setAllDates(state, inResult){
            state.allDates = inResult;
            if(inResult.length != 0 || inResult != ''){
                state.lastEntry = inResult[state.allDates.length - 1].datum;
            }
            else if(inResult.length == 0 || inResult == ''){
                state.lastEntry = 0
            }
        },

        selectDay(state, inDate){
            state.selectedDay = inDate;
        },

        getDataforDay(state){
            let result = [];
            if(state.selectedDay == moment(state.selectedDay).format('YYYY')){
                result = state.allDates.filter(x => moment(x.context).format('YYYY') == state.selectedDay)
            }
            if(state.selectedDay == moment(state.selectedDay).format('YYYY-MM')){
                result = state.allDates.filter(x => moment(x.context).format('YYYY-MM') == state.selectedDay)
            }
            if(state.selectedDay == moment(state.selectedDay).format('YYYY-MM-DD')){
                result = state.allDates.filter(x => moment(x.context).format('YYYY-MM-DD') == state.selectedDay)
            }
            state.dataforDay = result
        }
    },
    actions: {
        async selectDate({commit}, inDate){
            commit('setDate', inDate)
        },

        async selectDays({commit, dispatch}, inDate){
            let day = {
                datum_id: '',
                datum: inDate,
                text: '',
            }

            await commit('selectDay', inDate)
            dispatch('selectDate', day);
            commit('getDataforDay')
        },

        async saveDate({dispatch, getters}, toDate){
            if(getters.getSelectedTable != ""){
                if(toDate.id != ""){
                    await timestatRequests.updateDate(getters.getSelectedTable, toDate)
                } else if (toDate.id == ""){
                    await timestatRequests.saveDate(getters.getSelectedTable, toDate);
                }
                // commit()
                await dispatch('getAllDates', getters.getSelectedTable);
                if(getters.getSelectedDay != ''){
                    dispatch('selectDays', getters.getSelectedDay)
                }
            } else {
                alert('Keine Tabelle Ausgewählt')
            }

        },

        async deleteDate({dispatch, getters}, inId){
            await timestatRequests.deleteDate(getters.getSelectedTable, inId)
            dispatch('getAllDates', getters.getSelectedTable);
        },

        async getAllDates({commit, dispatch}, inTable){
            if(inTable != ''){
                var result = await timestatRequests.getAllDates(inTable)
                if(result.length == 0){
                    alert("Keine Daten vorhanden");
                } else {
                    result = result.sort((a,b) => moment(a.datum).format('X') - moment(b.datum).format('X'))
                    for(let i = 0; i < result.length; i++){
                        result[i].datum = moment(result[i].datum).format('YYYY-MM-DD HH:mm:ss')
                        result[i].context = moment(result[i].datum).format('YYYY-MM-DD')
                        result[i].year = moment(result[i].datum).format('YYYY')
                        result[i].month = moment(result[i].datum).format('MM')
                        result[i].day = moment(result[i].datum).format('DD')
                        result[i].inDate = true 
                    }
                }
            } else if (inTable == ''){
                result = ''
            }
            await commit('setStart', '')
            await commit('setEnd', '')
            await commit("setAllDates", result);
            // await commit('selectDays', '')
            
            dispatch("render", result);
        },
    },

  }
  