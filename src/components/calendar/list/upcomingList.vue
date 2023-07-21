<template>
<div>
    <h2> Liste der bevorstehenden Termine </h2>
    <h3> {{ today }} - Heute </h3>
    <table> 
        <tr v-for="x in allDates" :key="x.id" @click="select(x)">
            <td> {{ convertDate(x.datum) }} </td> 
            <td> {{ x.title }} </td>
            <td> In {{ getDifference(x.datum)}} Tagen</td>
            <td :style="getColor(x.verwendung_id)"> {{ getText(x.verwendung_id)}} </td>
        </tr>
    </table>
</div>
</template>
<script>
import moment from 'moment'
import { mapGetters, mapActions } from "vuex";
import { usageColor } from './../../general/usageColor.js'
import { formatDate } from './../../general/formatDate'

export default {
    methods: {
        ...mapActions('calendar', ['selectDate', 'selectDays']),

        async select(x){
            await this.selectDays(x.datum)
            this.selectDate(x)
        },

        getText(id){
            switch(id){
                case 1:
                    return "Standard";
                case 2: 
                    return "Arbeit";
                case 3: 
                    return "Termin";
                case 4: 
                    return "Gaming";
                case 5: 
                    return "Feiertage";
                case 6: 
                    return "Ereignisse";
            }
        },

        getColor(val){
            return usageColor(val)
        },
        convertDate(date){
            return formatDate(date)
        },

        getDifference(param){
            let date = moment(param).format("YYYY-MM-DD");
            let today = moment().format("YYYY-MM-DD")
            let result = moment(date).diff(today, 'days')
            return result
        }
    },
    computed: {
        ...mapGetters("calendar",  ['getAllDates']),

        allDates: function(){
            let newList = []
            let dates = this.getAllDates

            for(let i = 0; i < dates.length; i++){
                if(moment().format("YYYY-MM-DD") <= moment(this.getAllDates[i].datum).format("YYYY-MM-DD")){
                    newList.push(this.getAllDates[i])
                }
            }
            return newList
        },

        today: function(){
            let today = moment().format("YYYY-MM-DD");
            return formatDate(today)
        }
    },

    watch: {
        allDates: function(){
            let newList = []
            let dates = this.getAllDates

            for(let i = 0; i < dates.length; i++){
                if(moment().format("YYYY-MM-DD") <= moment(this.getAllDates[i].datum).format("YYYY-MM-DD")){
                    newList.push(this.getAllDates[i])
                }
            }
            return newList
        },
    }, 
}
</script>
<style scoped>
    table {
        border-collapse: collapse;

    }
    td, th {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #999;
    }
</style>