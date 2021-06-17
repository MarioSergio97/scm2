<template>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <TopBar @scmIsNotSelected="scmSelected=$event"/>
            <LeftSidebar/>
            <!-- Main Content -->
            <div class="main-content">
                <section class="section">
                    <div class="section-body">
                        <!-- add content here -->
                        <procesos-view v-if="vista"/>
                        <router-view v-if="!vista"/>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TopBar from "./TopBar.vue";
    import LeftSidebar from "./LeftSidebar.vue";
    import Footer from "./Footer.vue";
    import * as mb from "../../entities/models";
    import * as utils from "../../entities/utils/utils";
    import { eventBus  } from "../../main";
    import ProcesosView from "../views/gestion/proceso/list/proceso_list";

    // import right_sidebar from "../elements/right_sidebar";
    // import loader_overlay from "../elements/loader_overlay";


    export default {
        name: 'app',

        provide: function () {
            return {
                cambiarVista: this.cambiarVista,
            }
        },

        data(){
            return {
                filter: null,
                columns: '',
                vista: true,
            }
        },

        // props: {
        //     scmSelected : true,
        // },

        inject: {
            scmSelect: { default: ()=>{} },
            scmUnSelect: { default: ()=>{} },
        },

        methods:{

            filter_data(object) {
                return utils.filter_object_column(object, this.filter,this.columns);
            },

            cambiarVista(){
              this.vista = false;
            },

            scmUnSelect_acion(){
                this.scmUnSelect();
            },

            verificarAdministrador(){

                var usuario = eventBus.user;

                if(usuario.id_rol==1){
                    eventBus.esAdmin = true;
                }
            },

            verificarGestor(){


                    var usuario = eventBus.user;
                    var entidadGestora = eventBus.idEntidadGestora;

                    if(entidadGestora == usuario.id_entidad ){
                        eventBus.esGestor = true;
                    }else {
                        eventBus.esGestor = false;
                    }

            },
        },

        watch:{
            // scmSelected: function () {
            //     if(!this.scmSelected){
            //     this.$emit('scmIsNotSelected', false);
            //     }
            // }
        },

        components: {

            TopBar,
            LeftSidebar,
            Footer,
            ProcesosView,
            // right_sidebar,
            // loader_overlay,

        },

        created() {
            this.verificarAdministrador();
            this.verificarGestor();
            eventBus.estaEnHome = true;
        },

        beforeDestroy() {
            const recaptchaScripts = document.querySelectorAll('script');
            for (let i = 0; i < recaptchaScripts.length; i += 1) {
                recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i]);
            }
        },

        destroyed(){
            eventBus.estaEnHome = false;
        },

        async mounted() {
            await Vue.loadScript('../../static/assets/js/app.min.js')
            await Vue.loadScript('../../static/assets/js/scripts.js')
            await Vue.loadScript('../../static/assets/js/custom.js')
        }
    }

</script>

