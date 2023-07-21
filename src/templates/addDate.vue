<template>
    <div>
        <div> 
          <datepicker :propDate="dateItem.date" @getDate="setDate"></datepicker>
        </div>
        <div> 
          <button v-on:click="save()"> Speichern </button> 
        </div>
    </div>

</template>
    
<script>
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
        }
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
      save(){
        let id = this.dateItem.id
        let date = this.dateItem.date

        let item = {
          id,
          date,
        }

        // this.saveDate(item);
      },
    }
}
</script>

<style> 
</style>