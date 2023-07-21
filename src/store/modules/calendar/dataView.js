import moment from 'moment'
export default {
    state: {
        chekcsum: 0,
        sumData: 0,
        timelineLength: 0,
        timeline: [],
    },
    getters: {
        getTimeline: state => {
            return state.timeline
        }
    },
    mutations: {
        setTimeline(state, inResult){
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

            let startDate = moment(inResult[0].datum).format('YYYY-MM-DD')
            let endDate = moment(inResult[inResult.length - 1].datum).format('YYYY-MM-DD')
            
            let today = moment()
            let nextYear = moment(startDate).add(1, 'Y').format('YYYY')
            let nextMonth = moment(startDate).add(1, 'M').format('MM')

            var years = {}; let yearIndex = 0;
            var months = {}; let monthIndex = 0;
            var days = {}; let dayIndex = 0; 
            let daycounterYear = 1; let daycounterMonth = 1; 


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

                let isThisWeekend = false; let isThisDay = false;
                let result = inResult.filter(x => x.datum == startDate)

                checksum = checksum + result.length
                checksumMonth = checksumMonth + result.length
                checksumYear = checksumYear + result.length

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

                dayIndex++; 
                daycounterMonth++;
                daycounterYear++;
                timelineLength++;
                startDate = moment(startDate).add(1, 'd').format('YYYY-MM-DD')
            }
            state.sumData = checksum
            checksum = (checksum /  timelineLength * 100).toFixed(2)
            state.checksum = checksum
            state.timelineLength = timelineLength;
            state.timeline = years
        },
    },
    actions: {
        render({commit}, result){
            commit("setTimeline", result);
        }
    },
  }
  
