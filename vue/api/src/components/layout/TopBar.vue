<template>

  <nav class="navbar navbar-expand-lg sticky">

    <div class="form-inline mr-auto">
      <ul class="navbar-nav mr-3">
        <li>
          <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg collapse-btn">
            <i data-feather="align-justify"></i>
          </a>
        </li>
      </ul>
    </div>

    <!--      <li class="dropdown dropdown-list-toggle">-->
    <!--        <p> El usuario es administrador: {{esAdmin}}</p>-->
    <!--        <p> El usuario es gestor: {{esGestor}}</p>-->
    <!--      </li>-->

    <!--<li class="dropdown dropdown-list-toggle">-->
    <!--<a @click="" data-toggle="dropdown" class="nav-link nav-link-lg message-toggle">-->
    <!--<i data-feather="mail"></i>-->
    <!--</a>-->
    <!--</li>-->

    <!--<li class="dropdown dropdown-list-toggle">-->
    <!--<a @click="" data-toggle="dropdown" class="nav-link notification-toggle nav-link-lg">-->
    <!--<i data-feather="bell" class="bell"></i>-->
    <!--</a>-->
    <!--</li>-->

    <ul class="navbar-nav navbar-right mov-leave">
      <li v-if="hideUsername" v-resize @resize="onResizes">
        <h4 style="margin-top:10px">
          Bienvenido, {{ this.$store.site.user.nombre }}.</h4>
      </li>

      <li class="dropdown dropdown-list-toggle" v-if="estaEnHome">
        <a @click="unSelectSCM()" class="nav-link notification-toggle nav-link-lg">
          <i class="fas fa-sign-out-alt"></i>
          Cambiar SCM
        </a>
      </li>

      <li class="dropdown dropdown-list-toggle">
        <a @click="logout_action()" class="nav-link notification-toggle nav-link-lg text-danger">
          <i class="fas fa-sign-out-alt"></i>
          Cerrar sesión
        </a>
      </li>

      <!--<li class="dropdown">-->

      <!--<a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">-->
      <!--<img alt="image" src="../../../static/assets/img/mias/user2.png">-->
      <!--<span class="d-sm-none d-lg-inline-block"></span>-->
      <!--</a>-->

      <!--<div class="dropdown-menu dropdown-menu-right pullDown">-->
      <!--<div class="dropdown-title">Hello</div>-->
      <!--<a class="dropdown-item has-icon">-->
      <!--<i class="far fa-user"></i>-->
      <!--Profile-->
      <!--</a>-->
      <!--<a @click="selectSCM()" class="dropdown-item has-icon">-->
      <!--<i></i>-->
      <!--Cambiar SCM-->
      <!--</a>-->

      <!--<div class="dropdown-divider"></div>-->
      <!--<a class="dropdown-item has-icon text-danger">-->
      <!--<i class="fas fa-sign-out-alt"></i>-->
      <!--Logout-->
      <!--</a>-->
      <!--</div>-->
      <!--</li>-->
    </ul>

  </nav>

</template>

<script>

import {eventBus} from "../../main";

export default {

  data() {
    return {
      esAdmin: false,
      esGestor: false,
      estaEnHome: false,
      hideUsername: true
    }
  },
  // props:{
  //     scmSelected : true
  // },
  inject: {
    logout: {
      default: () => {
      }
    },
    scmUnSelect: {
      default: () => {
      }
    },
  },
  methods: {

    unSelectSCM() {
      // this.$emit('scmIsNotSelected', false);
      this.scmUnSelect();
    },

    logout_action() {
      this.logout();
    },

    onResizes() {
      const windowsSize = {x: window.innerWidth, y: window.innerHeight}
      if (windowsSize.x <= 786) {
        this.hideUsername = false;
      } else {
        this.hideUsername = true;
      }
    }

  },
  mounted() {
    this.esAdmin = eventBus.esAdmin;
    this.esGestor = eventBus.esGestor;
    this.estaEnHome = eventBus.estaEnHome;
  },

}

</script>
