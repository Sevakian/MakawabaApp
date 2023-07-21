import moment from 'moment'

export default{
    state: {
        datesForHour: [], 
        timeline: [],
        dayswithLimit: [],
        maxHeight: 0,

        timelineLength: 0,
        checksum: 0,
        sumData: 0,

        filter: {
            limit: 30,
            startDate: '',
            endDate: '',
            withHour: false,
        },
    },
    getters: {
        getTimeline: state => {
            return state.timeline
        },

        getDatesforHour: state => {
            return state.datesForHour
        },

        getDayswithLimit: state => {
            return state.dayswithLimit
        },

        getHeight: state => {
            return state.maxHeight
        },

        getLimit: state => {
            return state.filter.limit
        },

        getStartdate: state => {
            return state.filter.startDate
        },

        getEnddate: state => {
            return state.filter.endDate
        },
        
        getSumData: state => {
            return state.sumData
        },

        getSumTimeline: state => {
            return state.timelineLength
        },

        getChecksum: state => {
            return state.checksum
        },
    },
    mutations: {
        setDatesForHour(state, inResult){
            // let counter = 0;
            // let output = {}

            // while(counter < 24){
            //     output[counter] = {hour: counter, data: []}
            //     for(let i = 0; i < inResult.length; i++){
            //         if(moment(inResult[i].datum).format("H") == counter){
            //             output[counter].data.push(inResult[i])
            //         }
            //     }
            //     counter++; 
            // }
            let counter = 0;
            let hourCounter = 12;
            let output = {}

            while(counter < 24){
                output[counter] = {hour: hourCounter, data: []}
                for(let i = 0; i < inResult.length; i++){
                    if(moment(inResult[i].datum).format("H") == hourCounter){
                        output[counter].data.push(inResult[i])
                    }
                }
                hourCounter++;
                counter++; 
                if(hourCounter == 24){
                    hourCounter = 0
                }
            }
            state.datesForHour = output
        },

        // 1 -> daysOnly // 3 // 5 // 7 -> timeline class isoWeekend // 15 // 30 -> months
        setTimeline(state, inResult){
            state.maxHeight = 0
            if(inResult.length == 0){
                state.checksum = 0;
                state.timelineLength = 0;
                state.timeline = [];
                state.dayswithLimit = [];
                return;
            }

            let timelineLength = 0;
            let checksum = 0;
            let checksumMonth = 0;
            let checksumYear = 0;
            let checksumLimit = 0; 

            let startDate = state.filter.startDate
            let endDate = state.filter.endDate 
            
            let today = moment()
            let nextYear = moment(startDate).add(1, 'Y').format('YYYY')
            let nextMonth = moment(startDate).add(1, 'M').format('MM')

            var years = {}; let yearIndex = 0;
            var months = {}; let monthIndex = 0;
            var days = {}; let dayIndex = 0; 
            let daycounterYear = 1; let daycounterMonth = 1; 
            
            let daycounterLimit = 0;
            let checksumIndex = 0;
            var daysforLimit = {}; var limitData = {}

            while(moment(startDate) <= moment(endDate)){
                if(moment(startDate).format('YYYY') == nextYear){
                    yearIndex++;
                    checksumYear = 0;
                    daycounterYear = 1;
                    monthIndex=0;
                    months = {}
                    nextYear = moment(startDate).add(1, 'Y').format('YYYY');
                }
                
                if(moment(startDate).format('MM') == nextMonth){
                    monthIndex++;
                    checksumMonth=0;
                    daycounterMonth=1;
                    dayIndex=0;
                    days = {};
                    nextMonth = moment(startDate).add(1, 'M').format('MM');
                }

                if(daycounterLimit == state.filter.limit){
                    if(parseInt(checksumLimit + 1 + '0') > state.maxHeight){
                        state.maxHeight = checksumLimit + 1 + '0'
                    }
                    limitData[checksumIndex] = {sumDays: timelineLength, days: daysforLimit, sumVal: checksumLimit}
                    checksumIndex++;
                    daycounterLimit = 0; 
                    daysforLimit = {};
                    checksumLimit = 0;
                }

                let isThisWeekend = false; let isThisDay = false;
                let result = inResult.filter(x => x.context == startDate)

                checksum = checksum + result.length
                checksumMonth = checksumMonth + result.length
                checksumYear = checksumYear + result.length
                checksumLimit = checksumLimit + result.length

                if(moment(startDate).isoWeekday() == 6|| moment(startDate).isoWeekday() == 7){
                    isThisWeekend = true;
                }
                if(moment(startDate).format('YYYY-MM-DD') == moment(today).format('YYYY-MM-DD')){
                    isThisDay = true;
                }

                years[yearIndex] = {    year: moment(startDate).format('YYYY'), 
                                        months: months,
                                        sumVal: checksumYear,
                                        sumDays: daycounterYear
                                    }
                months[monthIndex] = {  month: moment(startDate).format('MM'), 
                                        date: moment(startDate).format('YYYY-MM'), 
                                        days: days, 
                                        sumVal: checksumMonth,
                                        sumDays: daycounterMonth
                                    }
                days[dayIndex] = {  
                                    isToday: isThisDay,
                                    isWeekend: isThisWeekend,
                                    year: moment(startDate).format('YYYY'), 
                                    month: moment(startDate).format('MM'), 
                                    day: moment(startDate).format('DD'), 
                                    date: moment(startDate).format('YYYY-MM-DD'), 
                                    sumVal: result.length, 
                                    data: result,
                                }
                daysforLimit[daycounterLimit] = {
                                            sumVal: result.length, 
                                            isToday: isThisDay,
                                            isWeekend: isThisWeekend,
                                            year: moment(startDate).format('YYYY'), 
                                            month: moment(startDate).format('MM'), 
                                            day: moment(startDate).format('DD'), 
                                            date: moment(startDate).format('YYYY-MM-DD'), 
                                            data: result,                                            
                                        }
                dayIndex++; 
                daycounterMonth++;
                daycounterYear++;
                daycounterLimit++;
                timelineLength++;
                startDate = moment(startDate).add(1, 'd').format('YYYY-MM-DD')
            }
            state.sumData = checksum
            checksum = (checksum /  timelineLength * 100).toFixed(2)
            state.checksum = checksum
            state.timelineLength = timelineLength;
            state.timeline = years
            state.dayswithLimit = limitData

            // console.log(JSON.parse(JSON.stringify(limitData)))
            // console.log(JSON.parse(JSON.stringify(years)));

        },
        setLimit(state, inLimit){
            state.filter.limit = inLimit
        },
        setStart(state, inDate){
            state.filter.startDate = inDate
        },
        setEnd(state, inDate){
            state.filter.endDate = inDate
        }
    },
    actions: {
        render({commit, getters}, result){
            if(result.length != 0){
                if(getters.getStartdate == ''){
                    let startDate = moment(result[0].context)
                    commit('setStart', moment(startDate).format('YYYY-MM-DD') )
                } 
                if(getters.getEnddate == ''){
                    let today = moment()
                    let endDate = moment(result[result.length - 1].context)
                    if(today > endDate){
                        commit('setEnd', moment(today).format('YYYY-MM-DD'))
                    } else {
                        commit('setEnd', moment(endDate).format('YYYY-MM-DD'))
                    }

                } 
            }
            commit("setDatesForHour", result)
            commit("setTimeline", result);
        },

        async setFilter({commit, dispatch, getters}, inFilter){
            await commit('setLimit', inFilter.limit)
            await commit('setStart', inFilter.startDate)
            await commit('setEnd', inFilter.endDate)
            await commit('selectDay', '')
            dispatch('render', getters.getAllDates)
        }
    },
  }
  