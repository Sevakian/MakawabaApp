<template>
<div>
    <div> 
        <h3 v-if="item.id != ''"> Edit: {{ item.id }} </h3>
        <h3 v-if="item.id == ''"> Neu </h3>
    </div>
    <form> 
        <div>
            <div class="eingabe">
                <label> Name </label><br>
                <input type="text" v-model="item.name" maxlength="30" placeholder="max 30"> 
            </div>
            <div class="eingabe">
                <label> Bild </label><br>
                <input type="file"  @change="setPicture($event)">
            </div>
            <div class="eingabe">
                <label> Hersteller </label><br>
                <input type="text" v-model="item.hersteller" maxlength="30" placeholder="max 30"> 
            </div>
            <div class="eingabe">
                <!-- selektor machen  -->
                <label> Erscheinungsjahr </label><br>
                <datepicker :propDate="item.jahr" @getDate="setDate"></datepicker>
            </div>
            <div class="eingabe">
                <label> Generation </label><br>
                <input type="text" v-model="item.gen" maxlength="30" placeholder="max 30">
            </div>
            <div class="eingabe">
                <label> Status </label><br>
                <select  v-model="item.status">
                    <option value=''> Nichts ausgewählt </option>
                    <option value="hab"> Hab </option>
                    <option value="verloren"> Verloren/Neu Kaufen </option>
                    <option value="kaufen"> Kaufen </option>
                    <option value="beobachten"> Beobachten </option>
                </select> 
            </div>
            <div class="eingabe">
                <!-- selector machen -->
                <label> Typ </label> <br>
                <select type="text" v-model="item.typ">
                    <option value=''> Nichts ausgewählt </option>
                    <option value="stationär"> Stationär </option>
                    <option value="handheld"> Handheld</option>
                    <option value="hybrid"> Hybrid</option>
                </select>
            </div>
            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Verkaufte Einheiten </label><br>
                    <input type="text" v-model="item.verkauft" maxlength="50" placeholder="max 50">
                </div>
            </div>
            <div class="eingabeCon"> 
                <div class="eingabe">
                    <label> Text </label><br>
                    <textarea rows="5" cols="40" v-model="item.textfeld" placeholder="max 50"></textarea>
                </div>
            </div>
            <div>
                <button v-on:click="save()"> Speichern </button>
                <button @click="select(null)"> Neue Konsole </button>
            </div>
        </div>
    </form>
</div>
</template>
    
<script>
import {mapActions } from "vuex";
import datepicker from '@/components/general/datepicker.vue'

export default {
    props: [
        'selected'
    ],

    components: {
        datepicker,
    },

    data(){
        return {
            item: {
                id: '',
                name: '',
                bild: '',
                hersteller: '',
                jahr: '',
                gen: '', 
                status: '',
                typ: '',
                verkauft: '',
                text: '',
            }
        }
    },
    computed: {
        selectedItem: function(){
            return this.selected
        }
    },
    watch: {
        selectedItem: function(){
            this.item.id = this.selectedItem.Konsoleid;
            this.item.name = this.selectedItem.KonsoleName;
            this.item.bild = this.selectedItem.Bild;
            this.item.hersteller= this.selectedItem.Hersteller;
            this.item.jahr = this.selectedItem.Erscheinungsjahr;
            this.item.gen = this.selectedItem.Generation;
            this.item.status = this.selectedItem.Status;
            this.item.typ= this.selectedItem.Typ;
            this.item.verkauft = this.selectedItem.AnzahlVerkauft;
            this.item.text = this.selectedItem.Text;
        }

    },

    methods: {
        ...mapActions('gaming', ['saveConsole', 'selectConsole']),

        setPicture(event){
            this.item.bild = event.target.files[0].name;
        },
        
        select(val){
            event.preventDefault();
            this.selectConsole(val);
        },
        
        setDate(e){
            if(e == 'Invalid date' ){
                this.item.jahr = ''
            }
            else {
                this.item.jahr = e
            }
        },

        save(){
            event.preventDefault();

            let id = this.item.id;
            let name = this.item.name;
            let bild = this.item.bild;
            let hersteller = this.item.hersteller;
            let jahr = this.item.jahr;
            let gen = this.item.gen;
            let status = this.item.status;
            let typ = this.item.typ;
            let verkauft = this.item.verkauft;
            let text = this.item.text;

            if(id == ''){ id = null;}
            if(name == ''){ return;}
            if(bild == ''){ bild = null;}
            if(hersteller == ''){ hersteller = null;}
            if(jahr == ''){ jahr = null;}
            if(gen == ''){ gen = null;}
            if(status == ''){ status = null;}
            if(typ == ''){ typ= null;} 
            if(verkauft == ''){ verkauft = null;} 
            if(text == ''){ text = null;}           

            let item = {
                id, 
                name,
                bild, 
                hersteller, 
                jahr,
                gen,
                status, 
                typ,
                verkauft,
                text
            }
            this.saveConsole(item);

        
        }
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


    .eingabeCon {
       display:flex;
    }
    input[type="checkbox"]:checked + label {
        color:white;
        background-color:black;
}
</style>