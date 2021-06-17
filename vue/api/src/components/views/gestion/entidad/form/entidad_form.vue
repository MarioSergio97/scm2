<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Entidad').feedbacks"
        :vobject="$v"
        nested="entidad"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el nombre' name='nombre' v-model="entidad.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Teléfono</label>
        <tc-input placeholder='Ingrese el teléfono' name='telefono' v-model="entidad.telefono"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group p-0 col-12">
        <label>Descripción<span class='required_field'>*</span></label>
        <tc-input :text_area="true" size="large" name="descripcion" v-model="entidad.descripcion"/>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Fecha de registro<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker name="fecha_registro" v-model="entidad.fecha_registro"></tc-date-picker>
          </div>
        </tc-form-item>
        <!--<tc-form-item class="form-group mb-0 col-md-6 px-3">-->
          <!--<label>Provincia</label>-->
          <!--<div class="d-flex flex-row">-->
            <!--<tc-autocomplete-->
              <!--placeholder="Seleccione la provincia"-->
              <!--name="id_provincia"-->
              <!--ref="select_provincia"-->
              <!--:successFeed="false"-->
              <!--:defaultValue="entidad.id_provincia"-->
              <!--v-model="entidad.id_provincia"-->
              <!--:url="mb.statics('Provincia').select_2_url"-->
            <!--/>-->
           <!--&lt;!&ndash;  <a-button type="dashed"-->
                      <!--icon="plus"-->
                      <!--class="dashed-primary rounded mt-1 ml-2"-->
                      <!--@click="openModalCreateprovincia">-->
            <!--</a-button> &ndash;&gt;-->
          <!--</div>-->
        <!--</tc-form-item>-->

        <!-- <a-modal
          @cancel="showModalCreateprovincia = false"
          v-if="showModalCreateprovincia"
          class="modal-form"
          :title="'Añadir provincia'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <provincia_form :model="null" @close_modal="provinciaAdded"/>
        </a-modal> -->
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>País<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Pais"
              name="id_pais"
              ref="select_pais"
              :successFeed="false"
              :defaultValue="entidad.id_pais"
              v-model="entidad.id_pais"
              :url="mb.statics('Pais').select_2_url"
            />
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatepais">
            </a-button> -->
          </div>
        </tc-form-item>
       <!--  <a-modal
          @cancel="showModalCreatepais = false"
          v-if="showModalCreatepais"
          class="modal-form"
          :title="'Añadir pais'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <pais_form :model="null" @close_modal="paisAdded"/>
        </a-modal> -->
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!entidad.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Entidad from "../../../../../entities/models/modules/gestion/entidad.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  // import Pais_form from '../../../nomencladores/pais/form/pais_form';
  // import Provincia_form from '../../../nomencladores/provincia/form/provincia_form';

export default {
  name: "entidad_form",
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
  validations: mb.statics('Entidad').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      entidad: mb.instance( 'Entidad'),
      // showModalCreatepais: false,
      // // pais_list: [],
      // showModalCreateprovincia: false,
      // provincia_list: [],
    };
  },
  computed: {
    entidadFeedbacks() {
      return mb.statics('Entidad').feedbacks;
    },
    button_text() {
      return this.entidad.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.entidad = mb.instance( 'Entidad',this.model);

  },
  components: {

       // Pais_form,
       // Provincia_form,
             },
  methods: {
      // openModalCreatepais() {
      //   this.showModalCreatepais = true;
      // },
      // paisAdded(refresh) {
      //   this.showModalCreatepais = false;
      //   refresh?this.refreshpais():'';
      // },
      // async refreshpais() {
      //   this.loading = true;
      //   await this.$refs.select_pais.load();
      //   this.loading = false;
      // },
      // openModalCreateprovincia() {
      //   this.showModalCreateprovincia = true;
      // },
      // provinciaAdded(refresh) {
      //   this.showModalCreateprovincia = false;
      //   refresh?this.refreshprovincia():'';
      // },
      // async refreshprovincia() {
      //   this.loading = true;
      //   await this.$refs.select_provincia.load();
      //   this.loading = false;
      // },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'entidad_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.entidad.get_id() ? "actualizado" : "añadido";
        this.entidad
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'entidad_list'}):this.entidad=mb.instance('Entidad');this.load_data();this.$refs.form.vobject.$reset()
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
@import "entidad_form.css";
</style>

