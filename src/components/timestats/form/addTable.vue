<template>
    <div class="form">
        <div v-if="tableItem.exists == true">
            <h3> Ausgewählte Tabelle: {{ tableItem.name }} </h3>
            <p> 
            <input type="text" v-model="tableItem.name" maxlength="50">
            </p>
            <button v-on:click="update()"> Name Ändern </button> 
            <button v-on:click="deleteTable()"> Löschen </button>
            <button v-on:click="toggle()"> Neu eintragen </button>

        </div>
        <div v-if="tableItem.exists == false"> 
            <span> Neu Eintragen </span>
            <input type="text" v-model="tableItem.name" maxlength="50"><br>
            <button v-on:click="save()"> Speichern </button>
            <button v-if="this.selectedTable != ''" v-on:click="cancel()"> Abbrechen </button>
        </div>
    </div>

</template>
    
<script>
import {mapActions, mapGetters}from 'vuex'

export default {
    name: 'addTable',
    data(){
      return {
        tableItem: {
          exists: '',
          name: '',
        },
      }
    },

    computed: {
      ...mapGetters('timestats', ['getSelectedTable']),

    selectedTable: {
            get: function(){
                return this.getSelectedTable;
            },
            set: function(newVal){
              if(newVal != ''){
                this.tableItem.exists = true
                this.tableItem.name = newVal
              }
              else if(newVal == ''){
                this.tableItem.exists = false
                this.tableItem.name = newVal                
              }
            }
      },

    },
    watch: {
      selectedTable: function(){
        if(this.selectedTable != ''){
          this.tableItem.exists = true
          this.tableItem.name = this.selectedTable
        }
        else if(this.selectedTable == ''){
          this.tableItem.exists = false;
          this.tableItem.name = '';
        }
      },
    },
    created(){
        this.selectedTable = this.getSelectedTable
    },

    methods: {
        ...mapActions('timestats', ['saveTable', 'dropTable', 'updateTable', 'selectTable']),

        toggle(){
            this.tableItem.exists = false
            this.tableItem.name = ''
        },  

        async update(){
          let selectedTable = this.selectedTable;
          let newName = this.tableItem.name.toLowerCase().replace(/\s/g, '');
          if(selectedTable == newName){
            return alert("Name vorhanden");
          }
          else if (selectedTable != newName){
            let item = {
              selectedTable,
              newName
            }
            await this.updateTable(item)
            localStorage.setItem('selectedTable', newName)
          }
        },

        async deleteTable(){
          let name = this.selectedTable
          if(confirm(`Bist du Sicher dass du die Tabelle ${name} löschen willst?`)){
            await this.dropTable(name)
            localStorage.setItem('selectedTable', '')
          }
          else {
            return;
          }
        },

        ///////////////////////////////////////

        async save(){
            let name = this.tableItem.name.toLowerCase().replace(/\s/g, '')
            if(name == ""){
              return alert("Kein Name eingegeben")
            }
            await this.saveTable(name);

            this.tableItem.name = this.selectedTable;
            if(this.tableItem.name != ''){
              this.tableItem.exists = true
            }
        },

        cancel(){
            this.exists = true;
            this.selectedTable = this.getSelectedTable   
        },
    }
}
</script>

<style> 
</style>