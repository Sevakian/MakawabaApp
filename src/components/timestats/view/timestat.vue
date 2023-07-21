<template>
    <div :style="getLength()">
        <button @click="log()">log </button>
        <svg :viewBox="this.box" style="background:black"> 
            <path stroke="#00ff00" stroke-width="0.5" fill="none" :d="grid"></path>
            <g v-for="x in this.curve" :key="x.id"> 
                <path stroke="#00ff00" stroke-width="2" fill="none" :d="x.path"> </path>
            </g>
        </svg>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {

    name: 'timestat',
    data(){
      return {
          curve: [],
          grid: ''
      }  
    },
    
    computed: {
        ...mapGetters("timestats",  ['getLimit', 'getDayswithLimit', 'getSumTimeline', 'getHeight']),

        timeline: function(){
            return this.getDayswithLimit
        },
        length: function(){
            return this.getSumTimeline
        },
        height: function(){
            return this.getHeight
        }

    },
    watch: {
        timeline: function(){
            this.box = this.getBox()
            this.grid = this.getGrid()
            this.curve = this.getCurve(this.timeline);          
        }
    },

    created(){
        this.box = this.getBox()
        this.grid = this.getGrid()
        this.curve = this.getCurve(this.timeline);
    },

    methods: {

        log(){
            console.log(this.timeline)
            console.log(this.height)
            console.log(this.length)
        },
        getLength(){
            let conSize = window.innerWidth - (window.innerWidth * 25 /100)
            if(this.length < conSize){
                return `width: ${conSize}px`
            }
            else if(this.length > conSize){
                return `width: ${this.length}px`
            }
        },
        getBox(){
            return `0 0 ${this.length} ${this.height}`
        },
        getGrid(){
            var code = "";  
            let height = this.height; 
            let length = this.length;

            //rechts nach links
            while(height != 0){
                code = code + `M 0 ${height} L ${length} ${height}`
                height = height - 10;
            }

            // oben nach unten
            let counter = 0;
            while (counter <= length){
                code = code + `M ${counter} 0 L ${counter} ${this.height}`
                counter = counter + this.getLimit;
            }
            return code;
        },
        getCurve(timeline){
            let x = 0
            let y = 220 
            let string = ``
            let newArray = []

            for(var item in timeline){
                string = `M ${x} ${y} `
                string = string + `L ${timeline[item].sumDays} ${parseInt(this.height) - parseInt(timeline[item].sumVal.toString() + "0")}`
                newArray.push({path: string, data: timeline[item].days})
                x = timeline[item].sumDays
                y = parseInt(this.height) - parseInt(timeline[item].sumVal.toString() + "0")
            }
            return newArray

        }
    }
}
</script>
<style scoped> 


</style>