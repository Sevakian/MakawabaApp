<template>
    <div> 
        <h3> Tabellen </h3>
        <div v-for="x in allTables" :key="x.id"> 
            <span @click="select(x)"> {{ x }} </span>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'tableList',

    computed: {
        ...mapGetters('calendar', ['getTables']),

        allTables: function(){
            return this.getTables
        }
    },
    watch: {},

    methods: {
        ...mapActions('calendar', ['selectTable']),

        select(item){
            localStorage.setItem('selectedCalTable', item)
            this.selectTable(item)
        }
    }

}

</script>
<style>

</style>