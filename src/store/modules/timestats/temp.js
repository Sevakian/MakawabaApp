// selectDays(state, inDate){

//     let result = []

//     if(inDate == ''){
//         state.selectedParams = ''
//         state.selectedDays = []
//         return;
//     }
//     else if(inDate.day != ''){
//         let date = moment(inDate.year + "-" + inDate.month + "-" + inDate.day).format('YYYY-MM-DD')
//         for(let i = 0; i < state.allDates.length; i++){
//             if(moment(state.allDates[i].context).format('YYYY-MM-DD') == date){
//                 result.push(state.allDates[i])
//             }
//         }
//         state.selectedParams = formatDate(date);
//     }
//     else if(inDate.month != ''){
//         let date = moment(inDate.year + "-" + inDate.month).format('YYYY-MM')
//         for(let i = 0; i < state.allDates.length; i++){
//             if(moment(state.allDates[i].context).format('YYYY-MM') == date){
//                 result.push(state.allDates[i])
//             }
//         }
//         state.selectedParams = formatDate(date);
//     }
//     else if(inDate.year != ''){
//         let date = moment(inDate.year).format('YYYY')
//         for(let i = 0; i < state.allDates.length; i++){
//             if(moment(state.allDates[i].context).format('YYYY') == date){
//                 result.push(state.allDates[i])
//             }
//         }
//         state.selectedParams = formatDate(date);
//     }

//     state.selectedDays = result
// }
// },