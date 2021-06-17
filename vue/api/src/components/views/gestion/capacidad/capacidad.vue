<template>
    <div>
        <CapacidadList v-if="!capacidadSelected"></CapacidadList>
        <CapacidadProceso v-if="capacidadSelected"></CapacidadProceso>
    </div>
</template>


<script>
    import CapacidadList from "./normal/list/capacidad_list.vue";
    import CapacidadProceso from "./capacidad_proceso/list/capacidad_proceso_list.vue";
    import { eventBus  } from "../../../../main";

    export default {
        name: "capacidad",
        provide: function () {
            return {
                selected: this.selected,
                unselected: this.unselected,
            }
        },
        data(){
            return {
                capacidadSelected:false,
            }
        },
        components: {CapacidadList,CapacidadProceso},

        methods:{
            selected() {
                this.capacidadSelected = true;
            },
            unselected() {
                this.capacidadSelected = false;
            },
        },
        mounted() {
            this.capacidadSelected = false;
        }
    }
</script>

<style scoped>

</style>