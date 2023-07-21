<template>
<div> 
<select v-model="year"> 
    <option :value="''">  </option>
    <option v-for="y in years" :key="y.id" :value="y"> {{ y }}</option>
</select>
<select v-model="month"> 
    <option :value="''">  </option>
    <option value="01"> Januar </option>
    <option value="02"> Februar </option>
    <option value="03"> März </option>
    <option value="04"> April </option>
    <option value="05"> Mai </option>
    <option value="06"> Juni </option>
    <option value="07"> Juli </option>
    <option value="08"> August </option>
    <option value="09"> September </option>
    <option value="10"> Oktober </option>
    <option value="11"> November </option>
    <option value="12"> Dezember </option>
</select>
<select v-model="day"> 
    <option :value="''"> </option>
    <option v-for="d in days" :key="d.id" :value="d"> {{ d }} </option>
</select>
</div>
</template>
<script>
import moment from 'moment'
export default {
    props: ['propDate'], 
    
    data(){
        return {
            selectedDate: '',

            storedYear: '',
            storedMonth: '',
            storedDay: '',

            year: '',
            month: '',
            day: '',

            years: [],
            months: [],
            days: [],
        }
    },

    mounted(){
        this.getYears()
        this.year = moment().format('YYYY')
        this.month = moment().format('MM')
        this.day = moment().format('DD')
        this.getDays();
    },

    watch:{
        year: function(){
            if(this.year != 'Invalid date'){
                this.storedYear = this.year
            }
                this.getDays()
                this.setDate()
        },

        month: function(){
            if(this.month != 'Invalid date'){
                this.storedMonth = this.month
            }
                this.getDays();
                this.setDate();
        },

        day: function(){
            if(this.day != 'Invalid date'){
                this.storedDay = this.day
            }
                this.getDays();
                this.setDate();  
        },


        propDate(){
            if(this.propDate != null && this.propDate != ''){
                this.year = moment(this.propDate).format('YYYY')
                this.month = moment(this.propDate).format('MM')
                this.day = moment(this.propDate).format('DD')
            }
            
            else if(this.propDate == null || this.propDate == ''){
                this.year = ''
                this.month = ''
                this.day = ''
            }
        }
    },

    methods: {
        setDate(){
            if(this.day != 'Invalid date' && this.month != 'Invalid date' && this.year != 'Invalid date'){
            this.selectedDate = moment(this.year + this.month + this.day).format('YYYY-MM-DD')
            this.$emit('getDate', this.selectedDate);
            }
        },
        getDays(){

            if(this.year == 'Invalid date' && this.month == 'Invalid date' && this.day == 'Invalid date'){
                this.year = this.storedYear 
                this.month = this.storedMonth 
                this.day = this.storedDay

                while(moment(this.year + this.month + this.day).format("YYYY-MM-DD") == 'Invalid date'){
                    this.storedDay = this.storedDay - 1
                    this.day = this.storedDay
                }
                return 

            }
            else if(this.year != 'Invalid date' && this.month != 'Invalid date'){ 
                let selectedYear = this.year;
                let selectedMonth = this.month;
                let firstDay = '01';
                let days = []

                let selectedDate = moment(selectedYear + selectedMonth + firstDay)
                let nextMonth = moment(selectedDate).add(1, 'M')
                while(moment(selectedDate).format('YYYY-MM-DD') < moment(nextMonth).format('YYYY-MM-DD')){
                    days.push(moment(selectedDate).format('DD'))
                    selectedDate = moment(selectedDate).add(1, 'd')        
                }
                this.days = days;
            }
        },

        getYears(){
            var today = moment().format('YYYY-MM-DD');
            let todayYear = moment(today).format('YYYY')
            let years = []
            let startyear = '1980'
            while(moment(startyear).format('YYYY') <= moment(todayYear).format('YYYY')){      
                startyear = moment(startyear).add(1, 'y')
                years.push(moment(startyear).format('YYYY'))
            }
            this.years = years
        }
    },
}
</script>
<style> 
</style>