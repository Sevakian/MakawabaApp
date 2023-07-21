<template>
    <div> 
        <div class="eingabe"> 
            <label> Suche Parameter: </label><br>
            <input @input="filterValue(filterVal)" v-model="filterVal" type="text" size="45">
        </div>
        <div class="eingabe">
            <h4> Sortieren</h4>
            <select v-model="order"> 
                <option value="lastAdded"> Zuletzt hinzugefügt </option>
                <option value="firstAdded"> Zuerst hinzugefügt </option>
                <option value="releasedASC"> Neueste Veröffentlichung </option>
                <option value="releasedDESC"> Älteste Veröffentlichung </option>
                <option value="selledUnits"> Verkaufte einheiten </option>
                
            </select>
        </div>
        <div>
            <h4> Status </h4>
                <p> 
                <input v-model="filterStatus" type="checkbox" value=''> 
                <label> Nichts ausgewählt</label>
                </p>
                <p> 
                <input v-model="filterStatus" type="checkbox" value="hab">  
                <label> Hab </label>
                </p>
                <p> 
                <input v-model="filterStatus" type="checkbox" value="verloren"> 
                <label> Verloren/Neu Kaufen </label>   
                </p>
                <p> 
                <input v-model="filterStatus" type="checkbox" value="kaufen">  
                <label> Kaufen</label>
                <input v-model="filterStatus" type="checkbox" value="beobachten"> 
                <label> Beobachten </label>
                </p>         
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'filterConsoles',

    data(){
        return {
            order: "lastAdded",
            filterVal: "",
            filterStatus: [],
        }
    }, 

    watch: { 
        consoles: function(){
            return this.getConsoles
        },
        order: function(){
            this.orderConsoleData(this.order)
        },
        filterStatus: function(){
            this.filterConsoleStatus(this.filterStatus)
        },
    },

    computed: {
        ...mapGetters('gaming', ['getConsoles']),

        consoles: function(){
            return this.getConsoles
        },
    },

    methods: {
        ...mapActions('gaming', ['filterConsoleValue','filterConsoleStatus', 'orderConsoleData']),

        filterValue(filterVal){
            var filter = filterVal.toString().split(',')
            for(var i = 0; i < filter.length; i++){
              filter[i] = filter[i].trim();
            }   
            filter = filter.filter(x => x != "");  
            this.filterConsoleValue(filter);       
        },
        getColor(val){
            val 
            return
        },
        
    }
}

</script>
<style scoped>
    .eingabe{
    padding-top:5px;
    padding-bottom:5px;
    font-weight: bold;
    margin:5px;
    }
    .eingabecheck{
    padding-top:5px;
    padding-bottom:5px;
    margin:5px; 
    overflow:auto;
    height:300px;
    width:300px;
    border:1px solid #999;
    
    }
</style>