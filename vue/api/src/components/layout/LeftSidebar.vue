<template>
  <div class="main-sidebar sidebar-style-2">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="#">
          <img alt="image" src="../../../static/assets/img/logo.png" class="header-logo" />
          <span  class="logo-name">SCM</span>
        </a>
      </div>
      <ul class="sidebar-menu">
        <li class="menu-header">Menú</li>

        <li class="dropdown">
          <a class="menu-toggle nav-link has-dropdown">
            <i class="fa fa-tasks" style="margin-top: 3px"></i>
            <span>Gestión</span></a>
          <ul class="dropdown-menu">
            <li @click="cambiarVista_action()">
              <router-link to="/nomencladores/tipo_proceso_list" class="nav-link">
                <i class="fas fa-project-diagram text-hover-danger"></i>
                <span>Tipo de procesos</span></router-link>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/gestion/proceso_list" class="nav-link">
                <i class="fas fa-project-diagram"></i>
                <span>Procesos</span></router-link>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/produccion/demanda_list" class="nav-link">
                <i class="fa fa-shopping-cart"></i>
                <span>Demanda</span></router-link>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/gestion/interrelacion_list" class="nav-link">
                <i class="fa fa-handshake"></i>
                <span>Interrelación</span></router-link>
            </li>
            
            <!--<li class="dropdown">-->
            <!--<a class="menu-toggle nav-link has-dropdown"><span>Procesos</span></a>-->
            <!--<ul class="dropdown-menu">-->
            <!--<li @click="cambiarVista_action()"><router-link to="/gestion/proceso_normal_list" class="nav-link"><span>Simple</span></router-link></li>-->
            <!--<li @click="cambiarVista_action()"><router-link to="/gestion/proceso_list" class="nav-link"><span>Ampliada</span></router-link></li>-->
            <!--</ul>-->
            <!--</li>-->

            <!--<li><router-link to="/gestion/capacidad_proceso_list" class="nav-link"><span>Capacidad-Procesos</span></router-link></li>-->
            <!--<li @click="cambiarVista_action()"><router-link to="/gestion/capacidad" class="nav-link"><span>Capacidad</span></router-link></li>-->
            <!--<li><router-link to="/gestion/parametro_capacidad_list" class="nav-link"><span>Parametos-Capacidad</span></router-link></li>-->
            <li @click="cambiarVista_action()">
              <router-link to="/gestion/reporte_list" class="nav-link">
                <i class="fa fa-clipboard-check"></i>
                <span>Reporte</span></router-link>
            </li>

            <li @click="cambiarVista_action()">
              <router-link to="/gestion/scm_resumen_list" class="nav-link">
                <i class="fa fa-book"></i>
                <span>Resumen-SCM</span></router-link>
            </li>

          </ul>
        </li>

        <li class="dropdown">
          <a class="menu-toggle nav-link has-dropdown">
            <i class="fa fa-chart-line" style="margin-top: 3px"></i>
            <span>Producción</span></a>
          <ul class="dropdown-menu">

            <li @click="cambiarVista_action()">
              <router-link to="/produccion/incidencia_list" class="nav-link">
                <i class="fa fa-fire-alt text-hover-warning"></i>
                <span>Incidencias</span></router-link>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/produccion/costo_list" class="nav-link">
                <i class="fa fa-calculator"></i>
                <span>Costo</span></router-link>
            </li>
            <li class="dropdown">
              <a href="" class="menu-toggle nav-link has-dropdown">
                <i class="fa fa-clipboard"></i>
                <span>Inventario</span></a>
              <ul class="dropdown-menu">
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/inventario_list" class="nav-link"><span>Normal</span></router-link>
                </li>
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/inventario_ajustado_list" class="nav-link"><span>Ajustado</span>
                  </router-link>
                </li>

              </ul>
            </li>
            <li class="dropdown">
              <a href="" class="menu-toggle nav-link has-dropdown">
                <i class="fa fa-rocket"></i>
                <span>Programa Lanzamiento</span></a>
              <ul class="dropdown-menu">
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/programa_lanzamiento_list" class="nav-link"><span>Normal</span>
                  </router-link>
                </li>
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/programa_lanzamiento_ajustado_list" class="nav-link">
                    <span>Ajustado</span></router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="" class="menu-toggle nav-link has-dropdown">
                <i class="fa fa-gift"></i>
                <span>Programa Entrega</span></a>
              <ul class="dropdown-menu">
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/programa_entrega_list" class="nav-link"><span>Normal</span></router-link>
                </li>
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/programa_entrega_ajustada_list" class="nav-link"><span>Ajustado</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="" class="menu-toggle nav-link has-dropdown">
                <i class="fa fa-search-dollar"></i>
                <span>Control</span></a>
              <ul class="dropdown-menu">
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/control_programa_lanzamiento_list" class="nav-link"><span>Programa Lanzamiento</span>
                  </router-link>
                </li>
                <li @click="cambiarVista_action()">
                  <router-link to="/produccion/control_programa_entrega_list" class="nav-link">
                    <span>Programa Entrega</span></router-link>
                </li>
              </ul>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/produccion/programa_produccion_list" class="nav-link">
                <i class="fa fa-chart-line" ></i>
                <span>Programación Actividad</span></router-link>
            </li>
            <li @click="cambiarVista_action()">
              <router-link to="/produccion/utilizacion_list" class="nav-link">
                <i class="far fa-chart-bar" style="margin-right: 10px"></i>
                <span>Utilización</span></router-link>
            </li>

          </ul>
        </li>

        <li @click="cambiarVista_action()" v-if="esAdministrador">
          <router-link to="/reportes/registro_list" class="nav-link">
            <i class="fa fa-folder" style="margin-top: 3px"></i>
            <span>Registro</span></router-link>
        </li>

        <!--        <li class="dropdown">-->
        <!--          <a class="menu-toggle nav-link has-dropdown">-->
        <!--            <span>Reportes</span></a>-->
        <!--          <ul class="dropdown-menu">-->
        <!--            <li @click="cambiarVista_action()">-->
        <!--              <router-link to="/reportes/registro_list" class="nav-link"><span>Registro</span></router-link>-->
        <!--            </li>-->

        <!--          </ul>-->
        <!--        </li>-->

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
import {eventBus} from "../../main";

export default {
  inject: {
    cambiarVista: {
      default: () => {
      }
    },
  },

  data() {
    return {
      esAdministrador: false,
    };
  },

  methods: {
    cambiarNombre(nombre) {
      this.$emit('cambiarTabla', nombre);
    },

    cambiarVista_action() {
      this.cambiarVista();
    },

    unSelectSCM() {
      // this.$emit('scmIsNotSelected', false);
      this.scmUnSelect();
    },
  },
  mounted() {
    this.esAdministrador = eventBus.esAdmin;
  }
}
</script>
