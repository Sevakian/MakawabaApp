<template>
    <div>
        <h3> Auswählen: {{ this.year }} {{ this.month }} {{ this.day }} </h3>

            <div v-for="y in timeline" :key="y.id">
            <h3 @mouseover="log(y.year, '', '')" class="selectable" @click="select(y.year, '', '')"> {{ y.year }}: {{ getPercent(y)}}%</h3>
            <div   class="year"
                    :style="isActiveYear == y.year ? activateYear(): 0"
                    > 

                <div  v-for="m in y.months" :key="m.id">
                <div class="selectable" @click="select(y.year, m.month, '')" @mouseover="log(y.year, m.month, '')"> 
                    <span   class="monthTitle"> {{ 
                            setThisMonth(m.month) + ': ' + getPercent(m)}}% </span>
                    <div  class="monthBar" :style="getMonthStyle(m)"/>
                </div>
                <div    :style="isActiveMonth == y.year + m.month ? activateMonth() : 0" 
                        class="month"
                        >
                
                    <div v-for="d in m.days" :key="d.id">
                    <div    @mouseover="log(y.year, m.month, d.day)" 
                            class="day"
                            @click="select(y.year, m.month, d.day)" 
                            :style="isActiveDay == y.year + m.month + d.day ? activateDay()  : getDayStyle(d)">

                    </div>
                    </div>
                </div>
                </div>

            </div>
            </div>
    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapActions } from "vuex";
import {setMonth} from './../../general/setMonth.js'

export default {
    name: "timeline",
    data(){
        return {
            isActiveDay: '',
            isActiveMonth: '',
            isActiveYear: '',

            year: "",
            month: "",
            day: "",
        }
    },
    
    computed: {
        ...mapGetters("timestats",  ['getTimeline', 'getSelectedDay', 'getSelectedTable']),


        timeline: function(){
            return this.getTimeline;
        },
        selectedDay: function(){
            return this.getSelectedDay
        },

        selectedTable: function(){
            return this.getSelectedTable
        },

        today: function(){
            let toda = moment().format("YYYY-MM-DD");
            let day = moment(toda).format('DD');
            let month = moment(toda).format('MM');
            month = setMonth(month)
            let year = moment(toda).format('YYYY')
            return day + " " + month + " " + year;
        }
    },

    watch: {
        timeline: function(){
            return this.getTimeline; 
        },
        
        selectedTable: function(){
            this.isActiveDay = ''
            this.isActiveMonth = ''
            this.isActiveYear = ''
        },
    },
        
    methods: {
        ...mapActions('timestats', ['selectDays']),

        setThisMonth(m){
            return setMonth(m)
        },
        log(y, m, d){
            this.year = y;
            this.month = setMonth(m)
            this.day = d;
            
        },
        select(y, m, d){
                this.isActiveYear = y
                this.isActiveMonth = y + m
                this.isActiveDay = y + m + d 

                let date = ''

                if(d != ''){
                    date = moment(y + "-" + m + "-" + d).format('YYYY-MM-DD')
                }
                else if(m != ''){
                    date = moment(y + "-" + m).format('YYYY-MM')
    
                }
                else if(y != ''){
                    date = moment(y).format('YYYY')
                }
                this.selectDays(date)
        },

        activateDay(){
            return "border:1px solid yellow;background-color:white;"
        },
        activateMonth(){
            return "background-color:#0092f3;"
        },
        activateYear(){
            return "border:5px solid #00ff00"
        },

        getColor(val){
            switch(true){
                case val == 0: return '#000000'; 
                case val <= 5: return '#001a00'; 
                case val <= 10: return '#003300'; 
                case val <= 15: return '#004d00'; 
                case val <= 20: return '#006600'; 
                case val <= 25: return '#008000'; 
                case val <= 30: return '#009900'; 
                case val <= 35: return '#00b300';
                case val <= 40: return '#00cc00'; 
                case val <= 45: return '#00e600'; 
                case val <= 50: return '#00ff00'; 
                case val <= 55: return '#1aff1a';
                case val <= 60: return '#33ff33';
                case val <= 65: return '#4dff4d';
                case val <= 70: return '#66ff66'; 
                case val <= 75: return '#80ff80';
                case val <= 80: return '#99ff99'; 
                case val <= 85: return '#b3ffb3';
                case val <= 90: return '#ccffcc'; 
                case val <= 95: return '#e6ffe6'; 
                case val > 95: return '#ffffff';       
            }
        },

        getPercent(val){
            let anzahlTage = val.sumDays
            let anzahlWerte = val.sumVal
            let checkSum = anzahlWerte / anzahlTage * 100;
            checkSum = Math.round(checkSum)
            return checkSum
        },

        getMonthStyle(val){
            let res = this.getPercent(val)
            let result = this.getColor(res)
            return `background-color:${result}`

        },

        getDayStyle(val){
            let style = '';
            let sum = parseInt(val.sumVal.toString() + '0')
            let result = this.getColor(sum);
            style = `background-color:${result};`
            if(val.isWeekend){
                style = style + "height:40px;"
            }
            // if(val.isToday){
            //     style = style + "border:1px solid red;background-color:red;"
            // }
            return style
            }
    }
}
</script>
<style scoped> 
.year {
    border:5px solid black;
    margin-bottom:20px;
    padding:20px;
    display:flex;
    flex-wrap: wrap;
    width: 900px;
    background-color:#004d80;
    
}
.monthTitle {
    color:white;
    font-weight:bold;
  
}
.monthBar{
    width:100%;
    height:10px;
}
.month {
    display:flex;
    align-items:center;
    padding-top:10px;
    padding-bottom:10px;
    height:60px;
    background-color:#004d80;
}

.month:hover {
background-color:#006eb8;
}

.day {
 border:1px solid black;
 width:2.5px;
 height:30px;
 cursor:pointer;
}
.day:hover {
    background-color:#ffffff;
    border:1px solid white;
}

.selectable {
    cursor:pointer;
}
</style>