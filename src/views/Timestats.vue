<template>
    <div class="container">
        <div class="left"> 
            <div> 
                <label> Modus Auswählen: </label>
                <select v-model="modus"> 
                    <option value="timestat">
                        Timestats
                    </option>
                    <option value="timeline">
                        Timeline    
                    </option>
                    <option value="h24">
                        24H            
                    </option>
                </select>
            </div>
            <addTable/>
            <hr>

            <tableList/>
            <hr>

            <addDate :selected="selectedDate"/>
            <hr>

            <dataList/>
        </div>
        <div class="mid"> 
            <div class="mid-top"> 
                <filterForm class="mid-top-item"/>
                <stats class="mid-top-item"/>
                
            </div>
                <div v-if="modus == 'timeline'"> 
                    <timeline/>
                </div>

                <div  v-if="modus == 'timestat'">   
                    <timestat/>
                </div>
                <div v-if="modus == 'h24'"> 
                    <h24/>
                </div>

        </div>
    </div>
</template>

<script>
import addDate from '@/components/timestats/form/addDate.vue'
import addTable from '@/components/timestats/form/addTable.vue'
import filterForm from '@/components/timestats/form/filterForm.vue'
import stats from '@/components/timestats/form/stats.vue'

import tableList from '@/components/timestats/list/tableList.vue'
import dataList from '@/components/timestats/list/dataList.vue'

import timeline from '@/components/timestats/view/timeline.vue'
import timestat from '@/components/timestats/view/timestat.vue'
import h24 from '@/components/timestats/view/24h.vue'

import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'timestats',
    components: {
        addDate,
        addTable,
        filterForm,
        stats,

        tableList,
        dataList,

        timeline,
        timestat,
        h24
        
    },

    data(){
      return {
        modus: "timeline"
        
      }
    },

    computed: {
      ...mapGetters('timestats', ['getselectedDate', 'getSelectedTable']),
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
        ...mapActions('timestats', ['getAllDates', 'selectTable', 'getTables'])
    },

    created(){
        var table = localStorage.getItem('selectedStatTable')
        this.selectTable(table);
        this.getAllDates(table);
        this.getTables();
    },

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