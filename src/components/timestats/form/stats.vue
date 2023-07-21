<template>
    <div> 
        <h3> Stats </h3>
        <p> 
            <span class="title"> Letzer Eintrag:  </span>
            <span class="value"> {{ format(lastEntry) }} </span>
        </p>
        <p>
            <span class="title"> Eingetragen: </span>
            <span class="value"> {{ sumData }} </span>
        </p>
        <p>
            <span class="title"> Anzahl Tage: </span>
            <span class="value"> {{ sumTimeline }} </span>
        </p>
        <p>
            <span class="title"> Verhältniss: </span>
            <span class="value"> {{ checksum }} % </span>
        </p>
    </div>
</template>
    
<script>
import {mapGetters} from 'vuex'
import {formatDate} from './../../general/formatDate'

export default {
    name: 'stats',
    computed: {
        ...mapGetters('timestats', ['getSumTimeline', 'getChecksum', 'getLastEntry', 'getSumData']),
    
    sumTimeline: function(){
        return this.getSumTimeline
    },

    checksum: function(){
        return this.getChecksum
    },

    lastEntry: function(){
        return this.getLastEntry
    },

    sumData: function(){
        return this.getSumData
    },
    
    },
    methods: {
        format(d){
            return formatDate(d);
        }
    }
}
</script>
<style scoped> 
.title {
    font-size:16px;
}
.value {
    font-weight:bold;
    font-size:16px;
}
</style>