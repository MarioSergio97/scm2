<template>
    <div class="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <a href="index.html"> <img alt="image" src="../../../static/assets/img/logo.png" class="header-logo" />
                    <span  class="logo-name">SCM</span>
                </a>
            </div>
            <ul class="sidebar-menu">
                <li class="menu-header">Menú</li>

                <li class="dropdown">
                    <a class="menu-toggle nav-link has-dropdown"><span>Gestión</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/gestion/scm_resumen_list" class="nav-link"><span>Resumen-SCM</span></router-link></li>
                        <li @click="cambiarVista_action()"><router-link to="/produccion/demanda_list" class="nav-link"><span>Demanda</span></router-link></li>
                        <li class="dropdown">
                    <a class="menu-toggle nav-link has-dropdown"><span>Procesos</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/gestion/proceso_normal_list" class="nav-link"><span>Simple</span></router-link></li>
                        <li @click="cambiarVista_action()"><router-link to="/gestion/proceso_list" class="nav-link"><span>Ampliada</span></router-link></li>
                    </ul>
                   </li>
                <li @click="cambiarVista_action()"><router-link to="/gestion/interrelacion_list" class="nav-link"><span>Interrelación</span></router-link></li>
                <!--<li><router-link to="/gestion/capacidad_proceso_list" class="nav-link"><span>Capacidad-Procesos</span></router-link></li>-->
                <!--<li @click="cambiarVista_action()"><router-link to="/gestion/capacidad" class="nav-link"><span>Capacidad</span></router-link></li>-->
                <!--<li><router-link to="/gestion/parametro_capacidad_list" class="nav-link"><span>Parametos-Capacidad</span></router-link></li>-->
                <li @click="cambiarVista_action()"><router-link to="/gestion/reporte_list" class="nav-link"><span>Reporte</span></router-link></li>


                    </ul>
                </li>

                <li class="dropdown">
                    <a class="menu-toggle nav-link has-dropdown"><span>Producción</span></a>
                    <ul class="dropdown-menu">

                         <li @click="cambiarVista_action()"><router-link to="/produccion/incidencia_list" class="nav-link"><span>Incidencias</span></router-link></li>
                          <li @click="cambiarVista_action()"><router-link to="/produccion/costo_list" class="nav-link"><span>Costo</span></router-link></li>
                           <li class="dropdown">
                         <a href="" class="menu-toggle nav-link has-dropdown"><span>Inventario</span></a>
                         <ul class="dropdown-menu">
                           <li @click="cambiarVista_action()"><router-link to="/produccion/inventario_list" class="nav-link"><span>Normal</span></router-link></li>
                           <li @click="cambiarVista_action()"><router-link to="/produccion/inventario_ajustado_list" class="nav-link"><span>Ajustado</span></router-link></li>
                    
                         </ul>
                           </li>
                           <li class="dropdown">
                    <a href="" class="menu-toggle nav-link has-dropdown"><span>Programa Lanzamiento</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/produccion/programa_lanzamiento_list" class="nav-link"><span>Normal</span></router-link></li>
                        <li @click="cambiarVista_action()"><router-link to="/produccion/programa_lanzamiento_ajustado_list" class="nav-link"><span>Ajustado</span></router-link></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="" class="menu-toggle nav-link has-dropdown"><span>Programa Entrega</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/produccion/programa_entrega_list" class="nav-link"><span>Normal</span></router-link></li>
                        <li @click="cambiarVista_action()"><router-link to="/produccion/programa_entrega_ajustada_list" class="nav-link"><span>Ajustado</span></router-link></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="" class="menu-toggle nav-link has-dropdown"><span>Control</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/produccion/control_programa_lanzamiento_list" class="nav-link"><span>Programa Lanzamiento</span></router-link></li>
                        <li @click="cambiarVista_action()"><router-link to="/produccion/control_programa_entrega_list" class="nav-link"><span>Programa Entrega</span></router-link></li>
                    </ul>
                </li>
                <li @click="cambiarVista_action()"><router-link to="/produccion/programa_produccion_list" class="nav-link"><span>Programación Actividad</span></router-link></li>
                <li @click="cambiarVista_action()"><router-link to="/produccion/utilizacion_list" class="nav-link"><span>Utilización</span></router-link></li>

                    </ul>
                </li>

                <li class="dropdown">
                    <a class="menu-toggle nav-link has-dropdown"><span>Reportes</span></a>
                    <ul class="dropdown-menu">
                        <li @click="cambiarVista_action()"><router-link to="/reportes/registro_list" class="nav-link"><span>Registro</span></router-link></li>

                    </ul>
                </li>

                <!--<li class="dropdown">-->
                    <!--<a class="menu-toggle nav-link has-dropdown"><span>Seguridad</span></a>-->
                    <!--<ul class="dropdown-menu">-->

                      <!--<li><router-link to="/seguridad/usuario_list" class="nav-link"><span>Usuarios</span></router-link></li>   -->
                      <!--<li><router-link to="/gestion/entidad_list" class="nav-link"><span>Entidades</span></router-link></li>-->

                    <!--</ul>-->
                <!--</li>                      -->
                              
               

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
    export default {
        inject: {
            cambiarVista: { default: ()=>{} },
        },

        methods:{
            cambiarNombre(nombre){
                this.$emit('cambiarTabla', nombre);
            },

            cambiarVista_action(){
                this.cambiarVista();
            }
        },
    }
</script>