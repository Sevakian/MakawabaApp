<template>
    <div class="container">
        <div v-for="x in this.gamesMonths" :key="x.id">
            <div class="bar">
                <div @click="select(y)" class="items" v-for="y in x.data" :key="y.id"> </div>
                <h4> {{ getMonth(x.month) }}</h4>
                <h4> {{ x.data.length }}</h4>
            </div>
           
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {setMonth } from '@/components/general/setMonth.js'
export default {
    name: 'gameView',
    
    created(){
        this.gamesForMonths(this.getGameList)
    },

    watch: { 
        games: function(){
            this.gamesForMonths(this.getGameList)
        }
    },

    computed: {
        ...mapGetters('gaming', ['getGameList', 'getGamesForMonths']),
        gamesMonths: function(){
            return this.getGamesForMonths
        },
        games: function(){
            return this.getGameList
        }
    },

    methods: {
        ...mapActions('gaming', ['gamesForMonths', 'selectGame']),
        getMonth(val){
            return setMonth(val)
        },
        select(val){
            this.selectGame(val)
        }
    }
}

</script>
<style scoped>
    .container{
        display:flex;
        align-items:flex-end;
    }
    .bar{
        flex-direction:row-reverse;  
        margin:5px;
        width:80px;
    }
    .items{
        width:60px;
        height:5px;
        margin:1px;
        background-color:#00ff00
    }
</style>