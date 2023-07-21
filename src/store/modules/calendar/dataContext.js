import calendarRequests from './../../../httprequest/calendarRequests'
import moment from 'moment'

export default {
    state: {
        allDates: [],

        selectedDay: '',
        dataforDay: [],

        selectedDate: [{
            datum_id: '',
            datum: '',
            title:'',
            text: '',
            verwendung: ''
        }],

        filter: [],
    },
    getters: {
        getselectedDate: state => {
            return state.selectedDate
        },
        getSelectedDay: state => {
            return state.selectedDay
        },
        getAllDates: state => {
            return state.allDates;
        },
        getDataforDay: state => {
            return state.dataforDay
        }
        
    },
    mutations: {
        setDate(state, inData){
            if(inData == moment(inData).format('YYYY-MM-DD')){
                state.selectedDate = [{
                    datum_id: '',
                    datum: inData,
                    title:'',
                    text: '',
                    verwendung: '1'
                }]
            }
            else if (inData.datum_id != null){
                state.selectedDate = [{
                    datum_id: inData.datum_id,
                    datum: inData.datum,
                    title: inData.title,
                    text: inData.text,
                    verwendung: inData.verwendung_id
                }]
            }
        },

        selectDay(state, inDate){
            state.selectedDay = inDate;
        },

        setDataforDay(state){
            let result = [];
            if(state.selectedDay == moment(state.selectedDay).format('YYYY')){
                result = state.allDates.filter(x => moment(x.datum).format('YYYY') == state.selectedDay)
            }
            if(state.selectedDay == moment(state.selectedDay).format('YYYY-MM')){
                result = state.allDates.filter(x => moment(x.datum).format('YYYY-MM') == state.selectedDay)
            }
            if(state.selectedDay == moment(state.selectedDay).format('YYYY-MM-DD')){
                result = state.allDates.filter(x => moment(x.datum).format('YYYY-MM-DD') == state.selectedDay)
            }
            state.dataforDay = result
        },

        setAllDates(state, inResult){
            state.allDates = inResult;
        },
    },
    actions: {
        async selectDate({commit}, inDate){
            commit("setDate", inDate)
        },
        async selectDays({commit}, inDate){
            await commit('selectDay', inDate)
            commit('setDataforDay')
        },

        async saveDate({dispatch, getters}, toDate){
            if(getters.getSelectedTable != ""){
                if(toDate.id != ""){
                    await calendarRequests.updateDate(getters.getSelectedTable, toDate)
                } else if (toDate.id == ""){
                    await calendarRequests.saveDate(getters.getSelectedTable, toDate);
                }
                await dispatch('getAllDates', getters.getSelectedTable);
                dispatch('selectDays', getters.getSelectedDay)
            } else {
                alert('Keine Tabelle Ausgewählt')
            }

        },
        async deleteDate({getters, dispatch}, inId){
            await calendarRequests.deleteDate(getters.getSelectedTable, inId);
            dispatch('getAllDates', getters.getSelectedTable);            
        },

        async getAllDates({commit, dispatch}, inTable){
            var result = await calendarRequests.getAllDates(inTable)
            if(result.length == 0){
                return alert("Keine Daten vorhanden");
            } else {
                result = result.calendar
                result = result.sort((a,b) => moment(a.datum).format('X') - moment(b.datum).format('X'))
                for(let i = 0; i < result.length; i++){
                    result[i].datum = moment(result[i].datum).format('YYYY-MM-DD')
                    result[i].year = moment(result[i].datum).format('YYYY')
                    result[i].month = moment(result[i].datum).format('MM')
                    result[i].day = moment(result[i].datum).format('DD')
                    result[i].inDate = true     
                }
            }
            await commit("setAllDates", result);
            dispatch("render", result);
        }
    },

  }
  