<template>
  <a-config-provider>
    <div>
      <Home v-if="auth && scmSelected" @scmIsNotSelected="scmSelected=$event"></Home>
      <Principal v-if="auth && !scmSelected"  @scmIsSelected="scmSelected=$event"></Principal>
      <Login v-if="!auth" />
    </div>
  </a-config-provider>
</template>
<script>

    import es_ES from 'ant-design-vue/lib/locale-provider/es_ES';
    import Login from "./components/layout/Login";
    import Home from "./components/layout/Home.vue";
    import Principal from "./components/layout/Principal.vue";
    import { eventBus  } from "./main";


    export default {
        name: "app",
        provide: function () {
            return {
                logout: this.logout,
                login: this.login,
                scmSelect: this.scmSelect,
                scmUnSelect: this.scmUnSelect,
            }
        },
        data(){
            return {
                es_ES,
                auth: this.$store.site.user != null,
                scmSelected: false,
            }
        },

        methods:{
            logout() {
                this.scmUnSelect();
                this.auth = this.$store.site.logout();
                eventBus.user = this.auth;
                // this.scmSelected = false;
            },
            login() {
                this.auth = this.$store.site.user;
                eventBus.user = this.auth;
                this.verificarAdministrador();
                // console.log("Estoy comprobando si eres admin");
            },
            scmSelect(){
                this.scmSelected = true;
            },
            scmUnSelect(){
                this.scmSelected = false;
            },

            verificarAdministrador(){

                var usuario = eventBus.user;

                if(usuario.id_rol==1){
                    eventBus.esAdmin = true;
                }else{
                    eventBus.esAdmin = false;
                }
            },
        },

        components: {Login,Home,Principal},

        mounted() {
            // this.auth=this.$store.site.user;
            // eventBus.user = this.auth;
            // this.verificarAdministrador();
            this.logout();
        },
        // updated(){
        //     this.auth=this.$store.site.user;
        //     eventBus.user = this.auth;
        // },

    }

</script>

<style scoped>
</style>

