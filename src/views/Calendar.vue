<template>
    <div class="container">
        <div class="left"> 
            <addDate :selected="selectedDate"/>
            <hr>

            <tableList/>
            <hr>

            <dataList/>
            <hr>
        </div>
        <div class="mid">
            <div> 
            <timeline/>
            </div>
        </div>
        <div>
            <upcomingList/>
        </div>

    </div>
</template>

<script>
import addDate from '@/components/calendar/form/addDate.vue'

import tableList from '@/components/calendar/list/tableList.vue'
import dataList from '@/components/calendar/list/dataList.vue'
import upcomingList from '@/components/calendar/list/upcomingList.vue'

import timeline from '@/components/calendar/view/timeline.vue'

import { mapGetters, mapActions } from "vuex";

export default {
    name: 'Calendar',

    components: {
        addDate, 

        tableList,
        dataList,
        upcomingList,

        timeline,
    },
    
    props: {

    },

    data(){
        return {

        }
    }, 

    async created(){
        await this.getTables();
        var table = localStorage.getItem('selectedCalTable')
        this.selectTable(table)
        await this.getAllDates(table)
        this.getVerwendungen();
    },

    computed: {
      ...mapGetters('calendar', ['getselectedDate']),
      selectedDate: function(){
        return this.getselectedDate[0]
      },
    },
    watch: {
      selectedDate: function(){
          return this.getselectedDate[0]
      },
    },

    methods: {
        ...mapActions('calendar', ['getAllDates', 'selectTable', 'getTables', 'getVerwendungen'])
    }
}

</script>
<style>
 .left {
     width:25%;
     margin: 20px;
 }

 .mid {
     width: 75%;
     margin: 20px;
 }

 .mid-top {
     display:flex;
 }
 .mid-top-item {
     padding-right:30px;
 }

 .container {
     display:flex;
 }
</style>