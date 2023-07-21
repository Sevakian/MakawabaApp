import axios from 'axios'

export default {
    apiUrl(){
        return 'http://localhost:5000/';
    },
    getGames(){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'gaming/games',
                method: 'get',
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            })
        })  
    },


    addGame(toGame){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'gaming/newGame',
                method: 'post',
                data: {
                    toGame,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })            
    },
    updateGame(toGame){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'gaming/updateGame',
                method: 'put',
                data: {
                    toGame,
                },
                headers:  {'Content-Type': 'application/json'},
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })  
    },

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////

    getConsoles(){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'gaming/consoles',
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
        })
    },

    addConsole(toConsole){
        return new Promise((resolve, reject) => {
            axios({
                url: this.apiUrl() + 'gaming/newConsole',
                method: 'post',
                data: {
                    toConsole
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

    updateConsole(toConsole){
        return new Promise((resolve, reject) => {

        axios({
            url: this.apiUrl() + 'gaming/updateConsole',
            method: 'put',
            data: {
                toConsole,
            },
            headers:  {'Content-Type': 'application/json'},
        })
        .then((response) => {   
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
        
    })},
}