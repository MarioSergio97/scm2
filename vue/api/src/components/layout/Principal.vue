<template>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <TopBar/>
            <LeftSideBar2></LeftSideBar2>
                <div class="main-content">
                     <scm-list v-if="vista"></scm-list>
                    <router-view v-if="!vista"/>
    <!--<button @click="selectSCM">Aceptar</button>-->
    <!--<a-tooltip placement="topLeft" title="Acceder a la SCM seleccionada">-->
        <!--<a-button icon="plus" type="primary" @click="selectSCM">Entrar</a-button>-->
    <!--</a-tooltip>-->
                </div>
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import scmList from "../views/gestion/scm/list/scm_list.vue";
    import TopBar from "./TopBar.vue";
    import LeftSideBar2 from "./LeftSidebar2";
    import { eventBus  } from "../../main";

    export default {
        name: "Principal",

        provide: function () {
            return {
                cambiarVista: this.cambiarVista,
            }
        },

        data(){
            return {
                vista: true,
                scmSelected : false,
            }
        },

        components: {scmList,TopBar,LeftSideBar2},

        methods:{
            cambiarVista(){
                this.vista = false;
            },
        },

        beforeDestroy() {
            const recaptchaScripts = document.querySelectorAll('script');
            for (let i = 0; i < recaptchaScripts.length; i += 1) {
                recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i]);
            }
        },

       async mounted(){
           await Vue.loadScript('../../static/assets/js/app.min.js');
           await Vue.loadScript('../../static/assets/js/scripts.js');
           await Vue.loadScript('../../static/assets/js/custom.js');
           eventBus.estaEnHome = false;
        },

    }
</script>

<style scoped>

</style>