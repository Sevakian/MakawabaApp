<template>
    <div class="container">
        <div class="left">
            <div>
                <label> Auswählen </label>
                <select v-model="modus"> 
                    <option value="gameList">
                        Spiele Liste
                    </option>
                    <option value="gameView">
                        Spiele Veröffentlichung
                    </option>
                    <option value="consoles">
                        Konsolen    
                    </option>
                </select>
            </div>

            <div v-if="modus == 'gameList' || modus == 'gameView'">
                <addGame :selected="selectedGame"/>
            </div>
            <div v-if="modus =='consoles'">
                <addConsole :selected="selectedConsole"/>
            </div>
        </div>

        <div class="mid">
            <div v-if="modus == 'gameList' || modus == 'gameView'"> 
            <h3> Anzahl Spiele: {{ length }}</h3>                
                <div class="container"> 
                    <gameList v-if="modus == 'gameList'"/>
                    <gameView v-if="modus == 'gameView'"/>
                    <filterGames/>
                </div>

            </div>
            <div v-if="modus == 'consoles'">
                <div class="container"> 
                    <consoleList/>
                    <filterConsoles/>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import addGame from '@/components/gaming/form/addGame.vue'
import addConsole from '@/components/gaming/form/addConsole.vue'
import gameList from '@/components/gaming/list/gameList.vue'
import gameView from '@/components/gaming/view/gameView.vue'
import consoleList from '@/components/gaming/list/consoleList.vue'
import filterGames from '@/components/gaming/form/filterGames.vue'
import filterConsoles from '@/components/gaming/form/filterConsoles.vue'


import { mapGetters, mapActions } from "vuex";

export default {
    name: 'Gaming',

    components: {
        addGame,
        addConsole,
        gameList,
        gameView,
        consoleList,
        filterGames,
        filterConsoles
    },

    data(){
        return {
            modus: "gameList"
        }
    }, 

    created(){
        this.getAllGames()
        this.getAllConsoles()
    },

    watch: { 
        selectedConsole: function(){
            return this.getSelectedConsole[0]
        },
        selectedGame: function(){
            return this.getSelectedGame[0]
        }
    },

    computed: {
        ...mapGetters('gaming', ['getSelectedConsole','getSelectedGame', 'getLength']),

        selectedConsole: function(){
            return this.getSelectedConsole[0]
        },
        selectedGame: function(){
            return this.getSelectedGame[0]
        },
        length: function(){
            return this.getLength
        }
    },

    methods: {
        ...mapActions('gaming', ['getAllGames','getAllConsoles'])
    }
}

</script>
<style>
 .left {
     width:20%;
     margin: 20px;
 }

 .mid {
     width: 80%;
     margin: 20px;
 }
 .container {
     display:flex;
 }
</style>