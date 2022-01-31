<template>
<div class="nimbus-is-editor sidebar-dark">
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
            <div class="row flex-grow">
                <div class="col-lg-6 d-flex align-items-center justify-content-center" @keyup.enter="login_action">
                    <div class="auth-form-transparent text-left p-3">
                        <h1 class="login-title">Gestión<span class="login-title-span">CadenaSuministros</span></h1>
                        <h4>Bienvenido!</h4>
                        <h6 class="font-weight-light">Introduzca sus credenciales!</h6>
                      <div v-if="error" class="alert alert-danger" role="alert">
                        {{message_error}}
                      </div>
                      <tc-form
                        nested="user"
                        :vobject="$v"
                        ref="form"
                        class="mt-3 mt-sm-5"
                      >

                        <div class="row">
                          <div class="col-12">
                            <tc-form-item >
                              <label class="control-label">Email*</label>
                              <tc-input icon="user"  type="text" v-model.trim="user.username" name="username" placeholder="Email" class="login-input"/>
                            </tc-form-item>
                          </div>
                          <div class="col-12">
                            <tc-form-item>
                              <label class="control-label">Contraseña*</label>
                              <tc-input icon="lock"  type="password" name="password" v-model.trim="user.password" placeholder="Contraseña"/>
                            </tc-form-item>
                          </div>
                          <div class="col-12">
                          </div>
                          <div class="col-12 mt-3">
                            <a-button  class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" style="background-color: #392C70;border-color: #392C70;color:white" :loading="loading" @click="login_action">
                              LOGIN
                            </a-button>
                          </div>
                        </div>
                      </tc-form>
                    </div>
                </div>
                <div class="col-lg-6 login-half-bg d-flex flex-row">
                    <p class="text-white font-weight-light text-center flex-grow align-self-end">Copyright &copy; 2020 SCM-Software-Versión 1.4 Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>
</div>
</template>

<script>
  import {required,} from 'vuelidate/lib/validators'

  export default {
    // name: 'login',
    inject: {
      login: { default: ()=>{} }
    },
    validations: {
      user: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    data () {
      return {
        user: {
          username: '',
          password: '',
        },
        error:false,
        loading:false,
        message_error:"Autenticación fallida, email o contraseña incorrectos"
      }
    },
    methods:{
      async login_action(){
        this.error=false
        this.loading=true
        if (this.$refs.form.validate()) {
          await this.$store.site.login(this.user).then(() => {
            this.login()
          }).catch((error) => {
            !error.response || error.response.status != 422 ? this.message_error = "Autenticación fallida, email o contraseña incorrectos" : ''
            this.error = true
          })
        }
        this.loading=false
      }
    }
  }
</script>
<style scoped>
.login-title {
    color: #68559f;
    font-weight: bold;
    font-style: italic;
    font-size: 3rem;
}

.login-title-span {
    color: #3a2c70;
}

.container-scroller {
  overflow: hidden;
}

@media (min-width: 992px) {
  .boxed-layout .container-scroller {
    background: #e5ecf0;
    padding: 0 calc((100% - 1200px) / 2);
  }
  .boxed-layout .navbar.fixed-top {
    margin: auto;
    max-width: 1200px;
  }
}

.container-fluid {
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
}

@media (max-width: 575.98px) {
  .navbar-expand-sm > .container,
  .navbar-expand-sm > .container-fluid {
    padding-right: 0;
    padding-left: 0;
  }
}

.navbar-expand-sm > .container,
  .navbar-expand-sm > .container-fluid {
    flex-wrap: nowrap;
  }

.navbar > .container,
.navbar > .container-fluid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.page-body-wrapper {
  min-height: calc(100vh - 70px);
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  padding-left: 0;
  padding-right: 0;
}

.page-body-wrapper.full-page-wrapper {
  width: 100%;
  min-height: 100vh;
}

.default-layout-navbar + .page-body-wrapper {
  padding-top: 70px;
}

@media (min-width: 992px) {
  .sidebar-absolute .page-body-wrapper {
    position: relative;
  }
  .sidebar-absolute .page-body-wrapper .sidebar {
    transition: none;
  }
  }

  @media (max-width: 991px) {
  .horizontal-menu .page-body-wrapper {
    padding-top: 90px;
  }
}

.content-wrapper {
  background: #f2f2f2;
  padding: 1.5rem 1.7rem;
  width: 100%;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}

.documentation .content-wrapper {
  padding-top: 0;
  min-height: calc(100vh - 75px);
}

.align-items-stretch, .navbar.horizontal-layout-navbar .navbar-menu-wrapper .navbar-nav.navbar-nav-left, .email-wrapper .message-body .attachments-sections ul li {
  align-items: stretch !important;
}
.font-weight-light {
  font-weight: 300 !important;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 10px;
  padding-left: 10px;
}

.col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
    position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 10px;
  padding-left: 10px;
  }

.was-validated .custom-control-input:valid ~ .custom-control-label, .custom-control-input.is-valid ~ .custom-control-label {
  color: #28a745;
}

.was-validated .custom-control-input:valid ~ .custom-control-label::before, .custom-control-input.is-valid ~ .custom-control-label::before {
  background-color: #71dd8a;
}

.was-validated .custom-control-input:valid ~ .valid-feedback,
.was-validated .custom-control-input:valid ~ .valid-tooltip, .custom-control-input.is-valid ~ .valid-feedback,
.custom-control-input.is-valid ~ .valid-tooltip {
  display: block;
}

.was-validated .custom-control-input:valid:checked ~ .custom-control-label::before, .custom-control-input.is-valid:checked ~ .custom-control-label::before {
  background-color: #34ce57;
}

.was-validated .custom-control-input:valid:focus ~ .custom-control-label::before, .custom-control-input.is-valid:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.mt-3, .template-demo > .btn, .fc .template-demo > button, .ajax-upload-dragdrop .template-demo > .ajax-file-upload, .swal2-modal .swal2-buttonswrapper .template-demo > .swal2-styled, .wizard > .actions .template-demo > a, .template-demo > .btn-toolbar,
.my-3 {
  margin-top: 1rem !important;
}

.auth .login-half-bg {
  /*background: url("../images/auth/login-bg.jpg");
  background-size: cover;*/
  background: rgb(104,85,159);
  background: linear-gradient(90deg, rgba(104,85,159,1) 0%, rgba(58,44,112,1) 50%, rgba(38,30,75,1) 100%);
}

.auth .register-half-bg {
/*  background: url("../images/auth/register-bg.jpg");*/
  background-size: cover;
}

.auth.lock-full-bg {
  /*background: url("../images/auth/lockscreen-bg.jpg");*/
  background-size: cover;
}

.auth .lock-profile-img {
  width: 90px;
  height: 90px;
  border-radius: 100%;
}

.auth .auth-form-dark {
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}

.auth .auth-form-dark .form-control, .auth .auth-form-dark .asColorPicker-input, .auth .auth-form-dark .dataTables_wrapper select, .dataTables_wrapper .auth .auth-form-dark select, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text], .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=text], .auth .auth-form-dark
.jsgrid .jsgrid-table .jsgrid-filter-row select,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark select, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number], .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=number], .auth .auth-form-dark .select2-container--default .select2-selection--single, .select2-container--default .auth .auth-form-dark .select2-selection--single, .auth .auth-form-dark .select2-container--default .select2-selection--single .select2-search__field, .select2-container--default .select2-selection--single .auth .auth-form-dark .select2-search__field, .auth .auth-form-dark .typeahead, .auth .auth-form-dark
.tt-query, .auth .auth-form-dark
.tt-hint {
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.auth .auth-form-dark .form-control:-ms-input-placeholder, .auth .auth-form-dark .asColorPicker-input:-ms-input-placeholder, .auth .auth-form-dark .dataTables_wrapper select:-ms-input-placeholder, .dataTables_wrapper .auth .auth-form-dark select:-ms-input-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:-ms-input-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=text]:-ms-input-placeholder, .auth .auth-form-dark
.jsgrid .jsgrid-table .jsgrid-filter-row select:-ms-input-placeholder,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark select:-ms-input-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:-ms-input-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=number]:-ms-input-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single:-ms-input-placeholder, .select2-container--default .auth .auth-form-dark .select2-selection--single:-ms-input-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single .select2-search__field:-ms-input-placeholder, .select2-container--default .select2-selection--single .auth .auth-form-dark .select2-search__field:-ms-input-placeholder, .auth .auth-form-dark .typeahead:-ms-input-placeholder, .auth .auth-form-dark
.tt-query:-ms-input-placeholder, .auth .auth-form-dark
.tt-hint:-ms-input-placeholder {
  color: #ffffff;
}

.auth .auth-form-dark .form-control:-moz-placeholder, .auth .auth-form-dark .asColorPicker-input:-moz-placeholder, .auth .auth-form-dark .dataTables_wrapper select:-moz-placeholder, .dataTables_wrapper .auth .auth-form-dark select:-moz-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:-moz-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=text]:-moz-placeholder, .auth .auth-form-dark
.jsgrid .jsgrid-table .jsgrid-filter-row select:-moz-placeholder,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark select:-moz-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:-moz-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=number]:-moz-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single:-moz-placeholder, .select2-container--default .auth .auth-form-dark .select2-selection--single:-moz-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single .select2-search__field:-moz-placeholder, .select2-container--default .select2-selection--single .auth .auth-form-dark .select2-search__field:-moz-placeholder, .auth .auth-form-dark .typeahead:-moz-placeholder, .auth .auth-form-dark
.tt-query:-moz-placeholder, .auth .auth-form-dark
.tt-hint:-moz-placeholder {
  color: #ffffff;
}

.auth .auth-form-dark .form-control::-moz-placeholder, .auth .auth-form-dark .asColorPicker-input::-moz-placeholder, .auth .auth-form-dark .dataTables_wrapper select::-moz-placeholder, .dataTables_wrapper .auth .auth-form-dark select::-moz-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]::-moz-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=text]::-moz-placeholder, .auth .auth-form-dark
.jsgrid .jsgrid-table .jsgrid-filter-row select::-moz-placeholder,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark select::-moz-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]::-moz-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=number]::-moz-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single::-moz-placeholder, .select2-container--default .auth .auth-form-dark .select2-selection--single::-moz-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single .select2-search__field::-moz-placeholder, .select2-container--default .select2-selection--single .auth .auth-form-dark .select2-search__field::-moz-placeholder, .auth .auth-form-dark .typeahead::-moz-placeholder, .auth .auth-form-dark
.tt-query::-moz-placeholder, .auth .auth-form-dark
.tt-hint::-moz-placeholder {
  color: #ffffff;
}

.auth .auth-form-dark .form-control::-webkit-input-placeholder, .auth .auth-form-dark .asColorPicker-input::-webkit-input-placeholder, .auth .auth-form-dark .dataTables_wrapper select::-webkit-input-placeholder, .dataTables_wrapper .auth .auth-form-dark select::-webkit-input-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]::-webkit-input-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=text]::-webkit-input-placeholder, .auth .auth-form-dark
.jsgrid .jsgrid-table .jsgrid-filter-row select::-webkit-input-placeholder,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark select::-webkit-input-placeholder, .auth .auth-form-dark .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]::-webkit-input-placeholder, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-dark input[type=number]::-webkit-input-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single::-webkit-input-placeholder, .select2-container--default .auth .auth-form-dark .select2-selection--single::-webkit-input-placeholder, .auth .auth-form-dark .select2-container--default .select2-selection--single .select2-search__field::-webkit-input-placeholder, .select2-container--default .select2-selection--single .auth .auth-form-dark .select2-search__field::-webkit-input-placeholder, .auth .auth-form-dark .typeahead::-webkit-input-placeholder, .auth .auth-form-dark
.tt-query::-webkit-input-placeholder, .auth .auth-form-dark
.tt-hint::-webkit-input-placeholder {
  color: #ffffff;
}

.auth .auth-form-light {
  background: #ffffff;
}

.auth .auth-form-light select {
  color: #686868;
}

.auth .auth-form-light .input-group .form-control:focus, .auth .auth-form-light .asColorPicker-wrap .form-control:focus, .auth .auth-form-light .input-group .asColorPicker-input:focus, .auth .auth-form-light .asColorPicker-wrap .asColorPicker-input:focus, .auth .auth-form-light .input-group .dataTables_wrapper select:focus, .dataTables_wrapper .auth .auth-form-light .input-group select:focus, .auth .auth-form-light .asColorPicker-wrap .dataTables_wrapper select:focus, .dataTables_wrapper .auth .auth-form-light .asColorPicker-wrap select:focus, .auth .auth-form-light .input-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group input[type=text]:focus, .auth .auth-form-light .asColorPicker-wrap .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap input[type=text]:focus, .auth .auth-form-light .input-group
.jsgrid .jsgrid-table .jsgrid-filter-row select:focus,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group select:focus, .auth .auth-form-light .asColorPicker-wrap
.jsgrid .jsgrid-table .jsgrid-filter-row select:focus,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap select:focus, .auth .auth-form-light .input-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group input[type=number]:focus, .auth .auth-form-light .asColorPicker-wrap .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap input[type=number]:focus, .auth .auth-form-light .input-group .select2-container--default .select2-selection--single:focus, .select2-container--default .auth .auth-form-light .input-group .select2-selection--single:focus, .auth .auth-form-light .asColorPicker-wrap .select2-container--default .select2-selection--single:focus, .select2-container--default .auth .auth-form-light .asColorPicker-wrap .select2-selection--single:focus, .auth .auth-form-light .input-group .select2-container--default .select2-selection--single .select2-search__field:focus, .select2-container--default .select2-selection--single .auth .auth-form-light .input-group .select2-search__field:focus, .auth .auth-form-light .asColorPicker-wrap .select2-container--default .select2-selection--single .select2-search__field:focus, .select2-container--default .select2-selection--single .auth .auth-form-light .asColorPicker-wrap .select2-search__field:focus, .auth .auth-form-light .input-group .typeahead:focus, .auth .auth-form-light .asColorPicker-wrap .typeahead:focus, .auth .auth-form-light .input-group
.tt-query:focus, .auth .auth-form-light .asColorPicker-wrap
.tt-query:focus, .auth .auth-form-light .input-group
.tt-hint:focus, .auth .auth-form-light .asColorPicker-wrap
.tt-hint:focus, .auth .auth-form-light .input-group .form-control:active, .auth .auth-form-light .asColorPicker-wrap .form-control:active, .auth .auth-form-light .input-group .asColorPicker-input:active, .auth .auth-form-light .asColorPicker-wrap .asColorPicker-input:active, .auth .auth-form-light .input-group .dataTables_wrapper select:active, .dataTables_wrapper .auth .auth-form-light .input-group select:active, .auth .auth-form-light .asColorPicker-wrap .dataTables_wrapper select:active, .dataTables_wrapper .auth .auth-form-light .asColorPicker-wrap select:active, .auth .auth-form-light .input-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group input[type=text]:active, .auth .auth-form-light .asColorPicker-wrap .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap input[type=text]:active, .auth .auth-form-light .input-group
.jsgrid .jsgrid-table .jsgrid-filter-row select:active,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group select:active, .auth .auth-form-light .asColorPicker-wrap
.jsgrid .jsgrid-table .jsgrid-filter-row select:active,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap select:active, .auth .auth-form-light .input-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .input-group input[type=number]:active, .auth .auth-form-light .asColorPicker-wrap .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-light .asColorPicker-wrap input[type=number]:active, .auth .auth-form-light .input-group .select2-container--default .select2-selection--single:active, .select2-container--default .auth .auth-form-light .input-group .select2-selection--single:active, .auth .auth-form-light .asColorPicker-wrap .select2-container--default .select2-selection--single:active, .select2-container--default .auth .auth-form-light .asColorPicker-wrap .select2-selection--single:active, .auth .auth-form-light .input-group .select2-container--default .select2-selection--single .select2-search__field:active, .select2-container--default .select2-selection--single .auth .auth-form-light .input-group .select2-search__field:active, .auth .auth-form-light .asColorPicker-wrap .select2-container--default .select2-selection--single .select2-search__field:active, .select2-container--default .select2-selection--single .auth .auth-form-light .asColorPicker-wrap .select2-search__field:active, .auth .auth-form-light .input-group .typeahead:active, .auth .auth-form-light .asColorPicker-wrap .typeahead:active, .auth .auth-form-light .input-group
.tt-query:active, .auth .auth-form-light .asColorPicker-wrap
.tt-query:active, .auth .auth-form-light .input-group
.tt-hint:active, .auth .auth-form-light .asColorPicker-wrap
.tt-hint:active {
  border-color: #e0e0ef;
}

.auth .auth-form-transparent {
  background: transparent;
}

.auth .auth-form-transparent .form-control, .auth .auth-form-transparent .asColorPicker-input, .auth .auth-form-transparent .dataTables_wrapper select, .dataTables_wrapper .auth .auth-form-transparent select, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text], .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=text], .auth .auth-form-transparent
.jsgrid .jsgrid-table .jsgrid-filter-row select,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent select, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number], .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=number], .auth .auth-form-transparent .select2-container--default .select2-selection--single, .select2-container--default .auth .auth-form-transparent .select2-selection--single, .auth .auth-form-transparent .select2-container--default .select2-selection--single .select2-search__field, .select2-container--default .select2-selection--single .auth .auth-form-transparent .select2-search__field, .auth .auth-form-transparent .typeahead, .auth .auth-form-transparent
.tt-query, .auth .auth-form-transparent
.tt-hint,
.auth .auth-form-transparent .input-group-text {
  border-color: #DEDEDE;
}

.auth .auth-form-transparent .form-control:focus, .auth .auth-form-transparent .asColorPicker-input:focus, .auth .auth-form-transparent .dataTables_wrapper select:focus, .dataTables_wrapper .auth .auth-form-transparent select:focus, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=text]:focus, .auth .auth-form-transparent
.jsgrid .jsgrid-table .jsgrid-filter-row select:focus,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent select:focus, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:focus, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=number]:focus, .auth .auth-form-transparent .select2-container--default .select2-selection--single:focus, .select2-container--default .auth .auth-form-transparent .select2-selection--single:focus, .auth .auth-form-transparent .select2-container--default .select2-selection--single .select2-search__field:focus, .select2-container--default .select2-selection--single .auth .auth-form-transparent .select2-search__field:focus, .auth .auth-form-transparent .typeahead:focus, .auth .auth-form-transparent
.tt-query:focus, .auth .auth-form-transparent
.tt-hint:focus, .auth .auth-form-transparent .form-control:active, .auth .auth-form-transparent .asColorPicker-input:active, .auth .auth-form-transparent .dataTables_wrapper select:active, .dataTables_wrapper .auth .auth-form-transparent select:active, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=text]:active, .auth .auth-form-transparent
.jsgrid .jsgrid-table .jsgrid-filter-row select:active,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent select:active, .auth .auth-form-transparent .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number]:active, .jsgrid .jsgrid-table .jsgrid-filter-row .auth .auth-form-transparent input[type=number]:active, .auth .auth-form-transparent .select2-container--default .select2-selection--single:active, .select2-container--default .auth .auth-form-transparent .select2-selection--single:active, .auth .auth-form-transparent .select2-container--default .select2-selection--single .select2-search__field:active, .select2-container--default .select2-selection--single .auth .auth-form-transparent .select2-search__field:active, .auth .auth-form-transparent .typeahead:active, .auth .auth-form-transparent
.tt-query:active, .auth .auth-form-transparent
.tt-hint:active,
.auth .auth-form-transparent .input-group-text:focus,
.auth .auth-form-transparent .input-group-text:active {
  border-color: #DEDEDE;
}

.auth .auth-form-transparent select {
  outline-color: #DEDEDE;
}

.auth.auth-img-bg {
  padding: 0;
}

@media (min-width: 768px) {
  .auth.auth-img-bg .auth-form-transparent {
    width: 55%;
    margin: auto;
  }
}

.auth .brand-logo {
  margin-bottom: 2rem;
}

.auth .brand-logo img {
  width: 150px;
}

.auth form .form-group {
  margin-bottom: 1.5rem;
}

.auth form .form-group label {
  font-size: .8125rem;
}

.auth form .form-group .form-control, .auth form .form-group .asColorPicker-input, .auth form .form-group .dataTables_wrapper select, .dataTables_wrapper .auth form .form-group select, .auth form .form-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=text], .jsgrid .jsgrid-table .jsgrid-filter-row .auth form .form-group input[type=text], .auth form .form-group
.jsgrid .jsgrid-table .jsgrid-filter-row select,
.jsgrid .jsgrid-table .jsgrid-filter-row .auth form .form-group select, .auth form .form-group .jsgrid .jsgrid-table .jsgrid-filter-row input[type=number], .jsgrid .jsgrid-table .jsgrid-filter-row .auth form .form-group input[type=number], .auth form .form-group .select2-container--default .select2-selection--single, .select2-container--default .auth form .form-group .select2-selection--single, .auth form .form-group .select2-container--default .select2-selection--single .select2-search__field, .select2-container--default .select2-selection--single .auth form .form-group .select2-search__field, .auth form .form-group .typeahead, .auth form .form-group
.tt-query, .auth form .form-group
.tt-hint {
  background: transparent;
  border-radius: 0;
  font-size: .9375rem;
}

.auth form .auth-form-btn {
  height: 50px;
  line-height: 1.5;
}

.auth form .auth-link {
  font-size: 0.8125rem;
}

.auth form .auth-link:hover {
  color: initial;
}

.d-flex, .navbar .navbar-menu-wrapper .navbar-nav .nav-item.dropdown .navbar-dropdown .dropdown-item, .navbar.default-layout-navbar .navbar-menu-wrapper .navbar-nav, .navbar.default-layout-navbar .navbar-menu-wrapper .navbar-nav .nav-item.nav-profile, .navbar.horizontal-layout-navbar .navbar-menu-wrapper .navbar-nav .nav-item .nav-link, .page-header, .loader-demo-box, .orders-chart-legend ul, .sales-status-chart-legend ul li, .list-wrapper ul li, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a, .email-wrapper .mail-sidebar .menu-bar .profile-list-item a .user, .email-wrapper .mail-list-container .mail-list .details, .email-wrapper .message-body .attachments-sections ul li .thumb, .email-wrapper .message-body .attachments-sections ul li .details .buttons, .lightGallery .image-tile .demo-gallery-poster, .swal2-modal {
  display: flex !important;
}

.flex-row, .email-wrapper .message-body .attachments-sections ul li {
  flex-direction: row !important;
}

.text-white {
  color: #ffffff !important;
}

.font-weight-light {
  font-weight: 300 !important;
}

.text-center {
  text-align: center !important;
}

.flex-grow {
  flex-grow: 1;
}

.align-self-end {
  align-self: flex-end !important;
}

.sidebar-dark .sidebar .nav .nav-item.nav-profile .profile-name .name {
  color: #ffffff;
}

</style>
