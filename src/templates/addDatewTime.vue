<template>
    <div>
        <div> 
          <datepicker :propDate="dateItem.date" @getDate="setDate"></datepicker>
        </div>
        <div> 
          <label> Uhrzeit: </label>
          <select v-model="dateItem.hour">
            <option v-for="i in this.hours" :key="i.id"> {{ i }} </option>
          </select>
          <select v-model="dateItem.minute">
            <option v-for="i in this.minutes" :key="i.id"> {{ i }} </option>
          </select>
        </div>
        <div> 
          <button v-on:click="save()"> Speichern </button> 
          <button v-on:click="updateTime()"> Update </button>
        </div>
    </div>

</template>
    
<script>
import moment from 'moment'
import datepicker from './../general/datepicker'
// import {mapActions, mapGetters}from 'vuex'

export default {
    name: 'addDate',
    // props: ['selected'],
    data(){
      return {
        dateItem: {
          id: '',
          date: '',
          hour: moment().format("HH"),
          minute: moment().format("mm"),
        },
        hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
                  '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],

        minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 
                    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
                    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
                    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', 
                    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', 
                    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'     
                    ],
      }
    },

    components: {
      datepicker
    },
    // computed: {
    //   selectedDate: function() {
    //     return this.selected 
    //   }
    // },
    // watch: {
    //   selectedDate: function(){
    //     this.dateItem.id = this.selectedDate.datum_id
    //     this.dateItem.date = moment(this.selectedDate.datum).format('YYYY-MM-DD')
    //     this.dateItem.hour = moment(this.selectedDate.datum).format('HH')
    //     this.dateItem.minute = moment(this.selectedDate.datum).format('mm')
    //   }
    // },

    methods: {
      // ...mapActions('', ['']),

      setDate(e){
        if(e == 'Invalid date' ){
            this.dateItem.date = ''
        }
        else {
            this.dateItem.date = e
        }
      },
      updateTime(){
        this.dateItem.id = ''
        this.dateItem.date = moment().format("YYYY-MM-DD")
        this.dateItem.hour = moment().format("HH"),
        this.dateItem.minute = moment().format("mm")
      },
      
      save(){
        let id = this.dateItem.id
        let date = this.dateItem.date
        let hour = this.dateItem.hour
        let minute = this.dateItem.minute

        date = date + " " + hour + ":" + minute + ":00"
        date = moment(date).format("YYYY-MM-DD HH:mm:ss")

        let item = {
          id,
          date,
        }

        console.log(item);

        // this.saveDate(item);
      },
    }
}
</script>

<style> 
</style>