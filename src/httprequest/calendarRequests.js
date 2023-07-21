import axios from 'axios';

export default {
    apiUrl(){
        return 'http://localhost:5000/';
    },
    getTables(){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'calendar/tables',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                // console.log(response)
                resolve(response.data);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            })
        })
    },

    newTable(newTable){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'calendar/tables/newTable',
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
        })},

    getAllDates(inTable){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'calendar/' + inTable,
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {    
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
            
        })},

    saveDate(toTable, toDate){
        return new Promise((resolve, reject) => {
    
            axios({
                url: this.apiUrl() + 'calendar/' + toTable + '/newDate',
                method: 'post',
                data: {
                    toDate
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
        })},

    updateDate(toTable, toDate){
        // console.log(toTable, toId, toTitle, toText, toVerwendung)
        return new Promise((resolve, reject) => {

            axios({
                url: this.apiUrl() + 'calendar/' + toTable + '/updateDate/',   
                method: 'put',
                data: {
                    toDate,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                console.log("Console log save Date api frontend");
                console.log(response);
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
                url: this.apiUrl() + 'calendar/' + toTable + '/deleteDate/',   
                method: 'delete',
                data: {
                    toId, 
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                console.log("Console log save Date api frontend");
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },


    getVerwendung(){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'calendar/verwendung',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data.calendar);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    
}