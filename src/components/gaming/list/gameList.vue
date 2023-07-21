<template>
    <div>
        <div class="gameList">
        <table>
            <tr>
                <th> Bild </th>
                <th> Name </th> 
                <th> Serie </th>
                <th> Genre </th>
                <th> Datum </th>
                <th> Entwickler </th>
                <th> Größe </th>
                <th> Verkaufte einheiten </th>                
            </tr>
                <tr :style="getColor(x.Status)" v-for="x in this.games" :key="x.id"> 
                    <td> 
                        <div v-if="x.Bild != null"> 
                        <img height="auto" width="80" :src="getImgGame(x.Bild)" alt="" />
                        </div>
                    </td>
                    <td style="width:200px;" @click="select(x)">  {{ x.Spielename }} </td>
                    <td> {{ x.Spieleserie }}</td>
                    <td> {{ x.Genre }}</td>
                    <td style="width:100px;"> {{ getDate(x.Erscheinungsjahr)}}</td>
                    <td> {{ x.Entwickler }}</td>
                    <td> {{ x.GrößeGB }}</td>
                    <td> {{ x.AnzahlVerkauft}}</td>  
                </tr>
        </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {formatDate} from '@/components/general/formatDate.js'


export default {
    name: 'gameList',

    watch: { 
        games: function(){
            return this.getGameList
        }
    },

    computed: {
        ...mapGetters('gaming', ['getGameList']),
        games: function(){
            return this.getGameList
        }
    },

    methods: {
        ...mapActions('gaming', ['selectGame','']),
        getImgGame(val){
            if(val != null){
                return require('@/assets/gaming/games/' + val)
            }
        },
        getColor(val){
            switch(val){
                case null:
                    break
                case 'hab':
                    return 'background-color:black;';
                case 'hab physisch':
                    return 'background-color:black;';
                case 'hab digital':
                    return 'background-color:black;';
                case 'verloren':
                    return 'background-color:#FF4500;'
                case 'kaufen':
                    return 'background-color:#ADFF2F;'
                case 'downloaden':
                    return 'background-color:#FFD700;'
                case 'merken':
                    return 'background-color:#CAD700;'
            }
        },

        getDate(val){
            return formatDate(val);
        },
        select(val){
            // console.log(JSON.parse(JSON.stringify(val)))
            this.selectGame(val)
        }
    }
}

</script>
<style scoped>
    table {
        border-collapse: collapse;

    }
    .row:hover{
        background-color: #9999
    }
    td, th {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #999;
    }
    .gameList{
        height: 1000px;
        overflow: auto;
        margin: 20px;
    }

</style>