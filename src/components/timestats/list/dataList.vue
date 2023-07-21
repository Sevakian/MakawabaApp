<template>
    <div> 
    <h3> Ausgabe: </h3>
    <p> 
        <span class="title"> Ausgewählt: </span>
        <span class="value"> {{ formatD(selectedDay) }}</span>
    </p>
    <div v-if="dataforDay.length != 0">
        <p>
            <span class="title"> Anzahl Einträge: </span>
            <span class="value">{{ dataforDay.length }}</span>
        </p>
    
        <table> 
            <tr>
                <th> Uhrzeit </th>
                <th> Tag </th>
                <th> Monat </th>
                <th> Jahr </th>
            </tr>
            <tr @click="select(x)" v-for="x in dataforDay" :key="x.id"> 
                <td >{{ formatH(x.datum) }} </td>
                <td >{{ x.day }} </td>
                <td >{{ formatM(x.month) }} </td>
                <td >{{ x.year }} </td>

            </tr>
        </table>
    </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {setMonth} from './../../general/setMonth.js'
import {formatDate} from './../../general/formatDate.js'
import moment from 'moment'

export default {
    name: 'dateList',

    computed: {
        ...mapGetters('timestats', ['getDataforDay', 'getSelectedDay']),

        dataforDay: function(){
            return this.getDataforDay
        },
        selectedDay: function(){
            return this.getSelectedDay
        }

    },
    watch: {
        dataforDay: function(){
            return this.getDataforDay
        },
        selectedDay: function(){
            return this.getSelectedDay
        }
    },

    methods: {
        ...mapActions('timestats', ['selectDate']),

        select(item){
            this.selectDate(item)
        },
        formatD(d){
            return formatDate(d);
        },
        formatM(d){
            return setMonth(d);
        },
        formatH(d){
            return moment(d).format('HH:mm')
        }
    }

}

</script>
<style scoped>
    td, th {
        padding: 0.3rem;
        text-align: center;
        cursor:pointer;
    }
    .title {
        font-size:16px;
    }
    .value {
        font-weight:bold;
        font-size:16px;
    }
</style>