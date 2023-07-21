import moment from 'moment'
import {setMonth} from './setMonth'

export function formatDate(d){
    let year = ''
    let month = ''
    let day = ''

    let hour = ''
    let minute = ''

    let output = ''

    if(d == moment(d).format('YYYY-MM-DD HH:mm:ss')){
        year = moment(d).format('YYYY');
        month = setMonth(moment(d).format('MM'))
        day = moment(d).format('DD')
    
        hour = moment(d).format('HH');
        minute = moment(d).format('mm')

        output = hour + ':' + minute + ' - ' + day + ' ' + month + ' ' + year
    }
    else if(d == moment(d).format('YYYY-MM-DD')){
        year = moment(d).format('YYYY');
        month = setMonth(moment(d).format('MM'))
        day = moment(d).format('DD')
    
        output = day + ' ' + month + ' ' + year 
    }
    else if(d == moment(d).format('YYYY-MM')){
        year = moment(d).format('YYYY');
        month = setMonth(moment(d).format('MM'))
        output = month + ' ' + year 
    }
    else if(d == moment(d).format('YYYY')){
        year = moment(d).format('YYYY');
        output = year
    }

    return output
}