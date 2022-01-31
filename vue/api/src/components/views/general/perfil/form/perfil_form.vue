<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Usuario').feedbacks"
        :vobject="$v"
        nested="usuario"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el nombre' name='nombre' v-model="usuario.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Correo<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el email' name='email' type="email" v-model="usuario.email"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Contraseña<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese la contraseña' name='contrasenna' v-model="usuario.contrasenna"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Teléfono</label>
        <tc-input placeholder='Ingrese el valor teléfono' name='telefono' v-model="usuario.telefono"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Cargo de empresa</label>
        <tc-input placeholder='Ingrese el cargo en la empresa' name='cargo_empresa' v-model="usuario.cargo_empresa"></tc-input>
      </tc-form-item>
        <!--<tc-form-item class="form-group mb-0 col-md-6 px-3">-->
          <!--<label>Entidad<span class='required_field'>*</span></label>-->
          <!--<div class="d-flex flex-row">-->
            <!--<tc-autocomplete-->
              <!--placeholder="Seleccione el entidad"-->
              <!--name="id_entidad"-->
              <!--ref="select_entidad"-->
              <!--:successFeed="false"-->
              <!--:defaultValue="usuario.id_entidad"-->
              <!--v-model="usuario.id_entidad"-->
              <!--:url="mb.statics('Entidad').select_2_url"-->
            <!--/>-->
            <!--&lt;!&ndash;<a-button type="dashed"&ndash;&gt;-->
                      <!--&lt;!&ndash;icon="plus"&ndash;&gt;-->
                      <!--&lt;!&ndash;class="dashed-primary rounded mt-1 ml-2"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="openModalCreateentidad">&ndash;&gt;-->
            <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
          <!--</div>-->
        <!--</tc-form-item>-->

        <!--<a-modal-->
          <!--@cancel="showModalCreateentidad = false"-->
          <!--v-if="showModalCreateentidad"-->
          <!--class="modal-form"-->
          <!--:title="'Añadir entidad'"-->
          <!--:visible="true"-->
          <!--:header="null"-->
          <!--:footer="null"-->
          <!--:maskClosable="false"-->
        <!--&gt;-->
          <!--<entidad_form :model="null" @close_modal="entidadAdded"/>-->
        <!--</a-modal>-->
      <!--<tc-form-item class="form-group mb-0 col-md-6 px-3">-->
        <!--<label>Authkey</label>-->
        <!--<tc-input placeholder='Ingrese el valor authkey'   type_char='num'  name='authkey' v-model="usuario.authkey"></tc-input>-->
      <!--</tc-form-item>-->
        <!--<tc-form-item class="form-group mb-0 col-md-6 px-3">-->
          <!--<label>Rol<span class='required_field'>*</span></label>-->
          <!--<div class="d-flex flex-row">-->
            <!--<tc-autocomplete-->
              <!--placeholder="Seleccione el Rol"-->
              <!--name="id_rol"-->
              <!--ref="select_rol"-->
              <!--:successFeed="false"-->
              <!--:defaultValue="usuario.id_rol"-->
              <!--v-model="usuario.id_rol"-->
              <!--:url="mb.statics('Rol').select_2_url"-->
            <!--/>-->
            <!--&lt;!&ndash;<a-button type="dashed"&ndash;&gt;-->
                      <!--&lt;!&ndash;icon="plus"&ndash;&gt;-->
                      <!--&lt;!&ndash;class="dashed-primary rounded mt-1 ml-2"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="openModalCreaterol">&ndash;&gt;-->
            <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
          <!--</div>-->
        <!--</tc-form-item>-->

        <!--<a-modal-->
          <!--@cancel="showModalCreaterol = false"-->
          <!--v-if="showModalCreaterol"-->
          <!--class="modal-form"-->
          <!--:title="'Añadir rol'"-->
          <!--:visible="true"-->
          <!--:header="null"-->
          <!--:footer="null"-->
          <!--:maskClosable="false"-->
        <!--&gt;-->
          <!--<rol_form :model="null" @close_modal="rolAdded"/>-->
        <!--</a-modal>-->
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!usuario.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Usuario from "../../../../../entities/models/modules/seguridad/usuario.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Entidad_form from '../../../gestion/entidad/form/entidad_form';
  import Rol_form from '../../../seguridad/rol/form/rol_form';

export default {
  name: "usuario_form",
  inject: {
      close_modal: { default: ()=>{} },
      load_data: {default: () => {} }
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
      modal: {
        type: Boolean,
        default: false
      },
    popoverPlacement: {
      type: String,
      default: "bottomLeft"
    }
  },
  validations: mb.statics('Usuario').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      usuario: mb.instance( 'Usuario'),
      showModalCreateentidad: false,
      entidad_list: [],
      showModalCreaterol: false,
      rol_list: [],
    };
  },
  computed: {
    usuarioFeedbacks() {
      return mb.statics('Usuario').feedbacks;
    },
    button_text() {
      return this.usuario.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.usuario = mb.instance( 'Usuario',this.model);

  },
  components: {

       Entidad_form,
       Rol_form,
             },
  methods: {
      openModalCreateentidad() {
        this.showModalCreateentidad = true;
      },
      entidadAdded(refresh) {
        this.showModalCreateentidad = false;
        refresh?this.refreshentidad():'';
      },
      async refreshentidad() {
        this.loading = true;
        await this.$refs.select_entidad.load();
        this.loading = false;
      },
      openModalCreaterol() {
        this.showModalCreaterol = true;
      },
      rolAdded(refresh) {
        this.showModalCreaterol = false;
        refresh?this.refreshrol():'';
      },
      async refreshrol() {
        this.loading = true;
        await this.$refs.select_rol.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'usuario_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.usuario.get_id() ? "actualizado" : "añadido";
        this.usuario
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'usuario_list'}):this.usuario=mb.instance('Usuario');this.load_data();this.$refs.form.vobject.$reset()
            }
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            utils.process_error(error);
          });
      }
    }
  }
};
</script>

<style scoped>
@import "perfil_form.css";
</style>

