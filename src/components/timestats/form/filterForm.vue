<template>
<div>
    <h3> Filtern </h3>
    <p> 
    <label> Anfangsdatum </label>
    <datepicker :propDate="this.start" @getDate="setStart"></datepicker><br>
    <label> Enddatum </label>
    <datepicker :propDate="this.end" @getDate="setEnd"></datepicker><br>
    <label> Limit festlegen </label>
    <select v-model="limit">
        <option v-for="x in 60" :key="x.id" :value="x"> {{ x }}</option>
    </select><br>
    <button @click="newRender()"> Anwenden </button>
    </p>
    <!-- TODO back to default button einbauen -->
</div>
</template>
<script> 
import datepicker from './../../general/datepicker.vue'
import moment from 'moment'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'filterForm',
    components: {
        datepicker

    },
    data(){
        return {
            limit: 1,
            start: '',
            end: '',      
        }
    },
    computed: {
        ...mapGetters('timestats', ['getStartdate', 'getEnddate']),

        startDate: function(){
            return this.getStartdate
        },
        endDate: function(){
            return this.getEnddate
        }
      },
    watch: {
        startDate: function(){
            this.start = this.startDate
            // return this.getStartdate;
        },
        endDate: function(){
            this.end = this.endDate
            // return this.getEnddate; 
        }

    },
    methods: {
        ...mapActions('timestats', ['setFilter']),

        setStart(v){
            this.start = v
        },
        setEnd(v){
            this.end = v
        },
        newRender(){
            if(moment(this.start) > moment(this.end)){
                this.start = this.startDate
                this.end = this.endDate
                return alert('Start darf nicht größer als Ende sein')
            }
            if(moment(this.end) < moment(this.start)){
                this.start = this.startDate
                this.end = this.endDate
                return alert('Ende darf nicht kleiner als Start sein')
            }
            if(moment(this.start) == moment(this.end)){
                this.start = this.startDate
                this.end = this.endDate
                return alert('Start darf nicht gleich Ende sein')
            } else {
                let item = {
                    limit: this.limit,
                    startDate: this.start,
                    endDate: this.end, 
                }
                this.setFilter(item)
            }
        }

    }

}
</script>