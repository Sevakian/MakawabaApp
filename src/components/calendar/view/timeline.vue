<template>
    <div>
        <h3> Auswählen: {{ this.year }} {{ this.month }} {{ this.day }} </h3>

            <div v-for="y in timeline" :key="y.id">
            <h3 @mouseover="log(y.year, '', '')" class="selectable" @click="select(y.year, '', '')"> {{ y.year }}</h3>
            <div   class="year"
                    :style="isActiveYear == y.year ? activateYear(): 0"
                    > 

                <div  v-for="m in y.months" :key="m.id">
                <div class="selectable" @click="select(y.year, m.month, '')" @mouseover="log(y.year, m.month, '')"> 
                    <span   class="monthTitle"> {{ 
                            setThisMonth(m.month) }} </span>
                    <div  class="monthBar"/>
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
import { setMonth } from './../../general/setMonth.js'
import { usageColor } from './../../general/usageColor.js'

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
        ...mapGetters("calendar",  ['getTimeline', 'getSelectedDay', 'getSelectedTable']),


        timeline: function(){
            return this.getTimeline;
        },
        selectedDay: function(){
            return this.getSelectedDay
        },

        selectedTable: function(){
            return this.getSelectedTable
        },
    },

    watch: {
        timeline: function(){
            return this.getTimeline; 
        },

        selectedDay: function(){
            if(this.getSelectedDay == ''){
                this.isActiveDay = ''
                this.isActiveMonth = ''
                this.isActiveYear = ''
            }
            if(this.getSelectedDay == moment(this.getSelectedDay).format('YYYY-MM-DD')){

                let y = moment(this.getSelectedDay).format('YYYY')
                let m = moment(this.getSelectedDay).format('MM')
                let d = moment(this.getSelectedDay).format('DD')

                this.isActiveDay = y + m + d
                this.isActiveMonth = y + m
                this.isActiveYear = y
            }
            return this.getSelectedDay
        },
        
        selectedTable: function(){
            this.isActiveDay = ''
            this.isActiveMonth = ''
            this.isActiveYear = ''
        },
    },
        
    methods: {
        ...mapActions('calendar', ['selectDays', 'selectDate']),

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
                    this.selectDate(date)

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



        getDayStyle(val){
            let style = ''

            if(val.isToday && val.data.length > 0){
                return "background-color:#ffffff;width:37px;border:3px solid red;height:40px;!important"                
            }
            else if(val.isToday && val.data.length == 0){
                return "background-color:#ffffff;width:40px;height:40px;"
            } 
            if(val.isWeekend){
                style = style + 'height:40px;'
            }
            if(val.data.length == 0){
                style = style + 'background-color:black'
            }
            if(val.data.length == 1){
                style = style + usageColor(val.data[0].verwendung_id)
            }
            if(val.data.length > 1){
                style = style + 'background-color:#FF1493'
            }
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
 width:10px;
 height:30px;
 margin:0.5px;
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