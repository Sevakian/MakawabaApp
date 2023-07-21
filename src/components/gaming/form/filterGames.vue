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

        <div class="eingabecheck"> 
            <div :style="getColor(x.Status)" v-for="x in this.consoles" :key="x.id">
                <label> {{ x.KonsoleName }}</label>
                <input :value="x.Konsoleid" v-model="filterConsole"  type="checkbox">
            </div>
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
                
                <input v-model="filterStatus" type="checkbox" value="hab digital"> 
                <label> Hab Digital </label>
                <input v-model="filterStatus" type="checkbox" value="hab physisch">  
                <label> Hab Physisch </label>
                </p>
                <p> 
                <input v-model="filterStatus" type="checkbox" value="verloren"> 
                <label> Verloren/Neu Kaufen </label>   
                </p>
                <p> 
                <input v-model="filterStatus" type="checkbox" value="kaufen">  
                <label> Kaufen</label>
                <input v-model="filterStatus" type="checkbox" value="downloaden">  
                <label> Downloaden </label>
                <input v-model="filterStatus" type="checkbox" value="merken"> 
                <label> Merken </label>
                </p>
                
        </div>
        <div class="eingabe">
            <h4> Dimension </h4>
            <select v-model="filterDimension"> 
                <option value="any"> Alle </option>
                <option value="2d"> 2D </option>
                <option value="3d"> 3D </option>
                <option value="empty"> Nichts ausgewählt </option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'filterGames',

    data(){
        return {
            order: "lastAdded",
            filterDimension: "any",

            filterVal: "",
            filterStatus: [],
            filterConsole: [],
        }
    }, 

    watch: { 
        consoles: function(){
            return this.getConsoles
        },
        order: function(){
            this.orderData(this.order)
        },
        filterDimension: function(){
            this.filterByDimension(this.filterDimension)
        },
        filterConsole: function(){
            this.filterByConsole(this.filterConsole)
        },
        filterStatus: function(){
            this.filterByStatus(this.filterStatus)
        },
    },

    computed: {
        ...mapGetters('gaming', ['getConsoles']),

        consoles: function(){
            return this.getConsoles
        },
    },

    methods: {
        ...mapActions('gaming', ['filterByValue','filterByStatus', 'filterByConsole', 'filterByDimension', 'orderData']),

        filterValue(filterVal){
            var filter = filterVal.toString().split(',')
            for(var i = 0; i < filter.length; i++){
              filter[i] = filter[i].trim();
            }   
            filter = filter.filter(x => x != "");  
            this.filterByValue(filter);       
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