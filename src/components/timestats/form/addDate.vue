<template>
    <div class="form">
        <div> 
        <h3 v-if="dateItem.id != ''"> Edit: {{ dateItem.id }} </h3>
        <h3 v-if="dateItem.id == ''"> Neu </h3>
        </div>
        <div> 
          <table> 
            <tr>
              <td>
                <label> Datum: </label>
              </td>
              <td>
                <datepicker :propDate="dateItem.date" @getDate="setDate"></datepicker>
              </td>
              <td rowspan="3"><button v-on:click="updateTime()"> Neu </button></td>
            </tr>

            <tr>
              <td>
                <label> Uhrzeit: </label>
              </td>
              <td>
                <select v-model="dateItem.hour">
                  <option v-for="i in this.hours" :key="i.id"> {{ i }} </option>
                </select>
                <select v-model="dateItem.minute">
                  <option v-for="i in this.minutes" :key="i.id"> {{ i }} </option>
                </select>                
              </td>
            </tr>
            
            <tr>
              <td>
                <label> Text: </label>
              </td>
              <td>
                <input type="text" v-model="dateItem.text" maxlength="50">
              </td>
            </tr>
            
          </table>
        </div>

        <div> 
          <button v-if="dateItem.id == ''" v-on:click="save()"> Speichern </button> 
          <button v-if="dateItem.id != ''" v-on:click="save()"> Speichern </button>
          <button v-if="dateItem.id != ''" v-on:click="deleteItem()"> Löschen </button>
        </div>

    </div>

</template>
    
<script>
import moment from 'moment'
import {mapActions, mapGetters}from 'vuex'
import datepicker from './../../general/datepicker'
export default {
    name: 'addDate',
    props: ['selected'],
    data(){
      return {
        dateItem: {
          id: '',
          date: '',
          hour: '',
          minute: '',
          text: '',
        },
        hours: [  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
                  '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],

        minutes: [  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 
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

    computed: {
      ...mapGetters('timestats', ['getSelectedTable']),

      selectedTable: function() {
        return this.getSelectedTable
      },
      selectedDate: function() {
        return this.selected 
      }
    },
    watch: {
      selectedTable: function(){
        this.updateTime()

      },

      selectedDate: function(){
        this.dateItem.id = this.selectedDate.datum_id
        this.dateItem.date = moment(this.selectedDate.datum).format('YYYY-MM-DD')
        this.dateItem.hour = moment(this.selectedDate.datum).format('HH')
        this.dateItem.minute = moment(this.selectedDate.datum).format('mm')
        this.dateItem.text = this.selectedDate.text
      }
    },

    methods: {
      ...mapActions('timestats', ['saveDate', 'deleteDate']),

      setDate(e){
        if(e == 'Invalid date' ){
          this.dateItem.date = moment().format('YYYY-MM-DD')
          this.dateItem.hour = moment().format("HH")
          this.dateItem.minute = moment().format("mm")
          return alert("Error");

        }
        else {
          this.dateItem.date = e

          if(this.dateItem.hour == 'Invalid date'){
            this.dateItem.hour = moment().format("HH")

          }
          if(this.dateItem.minute == 'Invalid date'){
            this.dateItem.minute = moment().format("mm")
          }
        }
      },
   
      save(){
        let id = this.dateItem.id
        let date = this.dateItem.date
        let hour = this.dateItem.hour
        let minute = this.dateItem.minute
        let text = this.dateItem.text

        if(text == ""){
          text = "NULL"
        }

        date = date + " " + hour + ":" + minute + ":00"
        date = moment(date).format("YYYY-MM-DD HH:mm:ss")

        let item = {
          id,
          date,
          text
        }
        this.saveDate(item);
        // this.updateTime()
      },

      deleteItem(){
        if(confirm("Bist du Sicher dass du das Datum löschen willst?")){
          let id = this.dateItem.id
          this.deleteDate(id)
          this.updateTime()
        }
        else {
          return;
        }
      },

      updateTime(){
        this.dateItem.id = ''
        this.dateItem.date = moment().format("YYYY-MM-DD")
        this.dateItem.hour = moment().format("HH")
        this.dateItem.minute = moment().format("mm")
        this.dateItem.text = ''
      },
    }
}
</script>

<style> 
table {
  /* width: 100%; */
}
</style>