import axios from 'axios'

export default {
    apiUrl(){
        return 'http://localhost:5000/';
    },

    ///////////////////////////////////////////////////
    //////////////////  Tabellen //////////////////////
    ///////////////////////////////////////////////////

    getTables(){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/tables',
                method: 'get',
            })
            .then((response) => {
                // console.log(response)
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },
    newTable(newTable){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/tables/newTable',
                method: 'post',
                data: {
                    newTable,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },
    updateTable(inTable){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/tables/updateTable',
                method: 'put',
                data: {
                    inTable,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },

    dropTable(table){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/tables/dropTable',
                method: 'delete',
                data: {
                    table,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                // console.log(response)
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },

    ///////////////////////////////////////////////////
    ////////////////////// Daten //////////////////////
    ///////////////////////////////////////////////////

    getAllDates(inTable){
        return new Promise((resolve, reject) => {
    
            axios({
                url: this.apiUrl() + 'timestats/' + inTable,
                method: 'get',
            })
            .then((response) => {   
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
            
        })},

    /// Einzelne Daten

    saveDate(toTable, toDate){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/' + toTable + '/newDate',
                method: 'post',
                data: {
                    toDate,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },
    updateDate(toTable, toDate){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/' + toTable + '/updateDate',
                method: 'put',
                data: {
                    toDate,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })        
    },
    deleteDate(toTable, toId){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'timestats/' + toTable + '/deleteDate',
                method: 'delete',
                data: {
                    toId,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })        
    }
}