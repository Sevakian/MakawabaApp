<template>
    <div> 
        <table> 
            <tr v-for="h in datesForHour" :key="h.id"> 
                <td> {{ h.hour}} </td>
                <td v-for="d in h.data" :key="d.id"> 
                    <div class="bar"> </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters("timestats", ["getDatesforHour"]),

        datesForHour: function() {
            return this.getDatesforHour
        }
    }
}
</script>

<style scoped> 
.bar {
    width:10px;
    height:20px;
    background-color:#00ff00;
}
</style>