<template>
    <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="#"> <img alt="image" src="../../../static/assets/img/logo.png" class="header-logo" />
                    <span  class="logo-name">SCM</span>
                </a>
            </div>
            <ul class="sidebar-menu">
                <li class="menu-header">Menú</li>

                  <li @click="cambiarVista_action()">
                    <router-link to="/gestion/scm_list" class="nav-link">
                      <i class="fa fa-link" style="margin-right: 10px" />
                      <span>Cadenas de Suministro</span></router-link>
                  </li>
                  <li @click="cambiarVista_action()" v-if="esAdministrador">
                    <router-link to="/seguridad/usuario_list" class="nav-link" >
                      <i class="fa fa-users" style="margin-right: 10px" />
                      <span>Usuarios</span></router-link>
                  </li>
                  <li @click="cambiarVista_action()" v-if="esAdministrador">
                    <router-link to="/gestion/entidad_list" class="nav-link" >
                      <i class="fa fa-city" style="margin-right: 10px" />
                      <span>Entidades</span></router-link>
                  </li>
                  <li @click="cambiarVista_action()">
                    <router-link to="/general/perfil_list" class="nav-link">
                      <i class="fa fa-user" style="margin-right: 10px" />
                      <span>Perfil</span></router-link>
                  </li>
                <!-- <li class="dropdown">
                    <a class="menu-toggle nav-link has-dropdown"><span>Control</span></a>
                    <ul class="dropdown-menu">
                        <li><router-link to="/produccion/control_programa_lanzamiento_list" class="nav-link"><span>Programa de lanzamiento</span></router-link></li>
                        <li><router-link to="/produccion/programaEntrega_list" class="nav-link"><span>Programa de entrega</span></router-link></li>
                    </ul>
                </li> -->
            </ul>
        </aside>
    </div>
</template>

<script>
    import { eventBus  } from "../../main";

    export default {

        inject: {
            cambiarVista: { default: ()=>{} },
        },

        data() {
            return {
                esAdministrador:false,
            };
        },

        methods:{
            cambiarNombre(nombre){
                this.$emit('cambiarTabla', nombre);
            },

            cambiarVista_action(){
                this.cambiarVista();
            }
        },

        mounted(){
          this.esAdministrador = eventBus.esAdmin;
        }
    }
</script>
