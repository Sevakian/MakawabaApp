<template>
    <div> 
        <div> 
            <h3> Anzahl Konsolen: {{ countConsoles }}</h3>
        </div>

        <div class="consoleList">
        <table>
            <tr>
                <th> Bild </th>
                <th> Name </th> 
                <th> Jahr </th>
                <th> Hersteller </th>
                <th> Typ </th>
                <th> Generation </th>
            </tr>
            <tr :style="getColor(x.Status)" v-for="x in this.consoles" :key="x.id"> 
                <td> 
                    <div v-if="x.Bild != null"> 
                        <img height="auto" width="100" :src="getImgConsole(x.Bild)" alt="" />
                    </div>
                </td>
                <td @click="select(x)">  {{ x.KonsoleName }} </td>
                <td style="width:100px;"> {{ getDate(x.Erscheinungsjahr) }}</td>
                <td> {{ x.Hersteller }} </td>
                <td> {{ x.Typ }}</td>
                <td> {{ x.Generation }}</td>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {formatDate} from './../../general/formatDate.js'

export default {
    name: 'consoleList',

    data(){
        return {
            countConsoles: 0,
        }
    }, 

    watch: { 
        consoles: function(){
            this.countConsoles = this.getConsoleList.length
            return this.getConsoleList
        }
    },

    computed: {
        ...mapGetters('gaming', ['getConsoleList']),

        consoles: function(){
            return this.getConsoleList
        }

    },

    methods: {
        ...mapActions('gaming', ['selectConsole','']),
        getImgConsole(val){
            if(val != null){
                return require('@/assets/gaming/konsoles/' + val)
            }
        },
        getColor(val){
            switch(val){

                case null:
                    break
                case 'hab':
                    return 'background-color:black;';
                case 'verloren':
                    return 'background-color:#FF4500;'
                case 'kaufen':
                    return 'background-color:#ADFF2F;'
                case 'beobachten':
                    return 'background-color:#FFD700;'
            }
        },
        getDate(val){
            return formatDate(val);
        },
        select(val){
            this.selectConsole(val)
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
    .consoleList{
        height: 1000px;
        overflow: auto;
        margin: 20px;
    }

</style>