<template>
    <div class="form">
        <div> 
        <h3 v-if="dateItem.id != ''"> Edit: {{ dateItem.id }} </h3>
        <h3 v-if="dateItem.id == ''"> Neu </h3>
        </div>
        <div> 
          <table> 

            <!-- Datum  -->
            <tr>
              <td>
                <label> Datum: </label>
              </td>
              <td>
                <datepicker :propDate="dateItem.date" @getDate="setDate"></datepicker>
              </td>
              <td rowspan="3"><button v-on:click="updateTime()"> Neu </button></td>
            </tr>

            <!-- Titel -->
            <tr>
              <td>
                <label> Titel: </label>
              </td>
              <td>
                <input type="text" v-model="dateItem.title" maxlength="30">
              </td>
            </tr>

            <!-- Text  -->
            <tr>
              <td>
                <label> Text </label>
              </td>
                <td colspan="1">
                  <textarea v-model="dateItem.textfeld" id="textfeld" name="textfeld" rows="6" cols="30" maxlength="300"/> 
                </td>
            </tr>

            <!-- Verwendung  -->
            <tr>
              <td>
                <label> Verwendung </label>
              </td>
              <td>
                <select v-model="dateItem.verwendung" > 
                  <option :value="x.verwendung_id" v-for="x in verwendungen" :key="x.verwendung_id" > {{x.text}} </option>
                </select>                 
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
          title: '',
          text: '',
          verwendung: '1',
        },
      }
    },

    components: {
      datepicker
    },

    computed: {
      ...mapGetters('calendar', ['getSelectedTable', 'getVerwendungen']),

      selectedTable: function() {
        return this.getSelectedTable
      },
      selectedDate: function() {
        return this.selected 
      },
      verwendungen: function(){
        return this.getVerwendungen
      }
    },
    watch: {
      selectedTable: function(){
        this.updateTime()

      },

      selectedDate: function(){
        this.dateItem.id = this.selectedDate.datum_id
        this.dateItem.date = moment(this.selectedDate.datum).format('YYYY-MM-DD')
        this.dateItem.title = this.selectedDate.title
        this.dateItem.text = this.selectedDate.text
        this.dateItem.verwendung = this.selectedDate.verwendung
        
      }
    },

    methods: {
      ...mapActions('calendar', ['saveDate', 'deleteDate', 'selectDays']),

      setDate(e){
        if(e == 'Invalid date' ){
          this.dateItem.date = moment().format('YYYY-MM-DD')
          return alert("Error");

        }
        else {
          this.dateItem.date = e
        }
      },
   
      save(){
        let id = this.dateItem.id
        let date = this.dateItem.date
        let title = this.dateItem.title
        let text = this.dateItem.text
        let verwendung = this.dateItem.verwendung

        if(title == ""){
          return
        }
        if(text == ""){
          text = "NULL"
        }
        
        let item = {
          id,
          date,
          title,
          text, 
          verwendung
        }
        this.saveDate(item);
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
        this.dateItem.title = '',
        this.dateItem.text = ''
        this.dateItem.verwendung = '1'

        this.selectDays('')
      },
    }
}
</script>

<style> 
table {
  /* width: 100%; */
}
</style>