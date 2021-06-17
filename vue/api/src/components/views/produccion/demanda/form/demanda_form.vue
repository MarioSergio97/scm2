<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Demanda').feedbacks"
        :vobject="$v"
        nested="demanda"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Número de intervalo<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el número de intervalo'   type_char='num'  name='no_intervalo' v-model="demanda.no_intervalo"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Demanda final en el intervalo<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor de demanda final'   type_char='dec'  name='demanda_final' v-model="demanda.demanda_final"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Demanda agrupada final<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor de la demanda agrupada final'   type_char='dec'  name='demanda_agrupada' v-model="demanda.demanda_agrupada"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Fecha<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker name="fecha" v-model="demanda.fecha"></tc-date-picker>
          </div>
        </tc-form-item>
       <!--  <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Scm<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione la scm"
              name="id_scm"
              ref="select_scm"
              :successFeed="false"
              :defaultValue="demanda.id_scm"
              v-model="demanda.id_scm"
              :url="mb.statics('Scm').select_2_url"
            /> -->
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatescm">
            </a-button> -->
        <!--   </div>
        </tc-form-item> -->

        <!-- <a-modal
          @cancel="showModalCreatescm = false"
          v-if="showModalCreatescm"
          class="modal-form"
          :title="'Añadir scm'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <scm_form :model="null" @close_modal="scmAdded"/>
        </a-modal> -->
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!demanda.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Demanda from "../../../../../entities/models/modules/produccion/demanda.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
//import Scm_form from '../../../gestion/scm/form/scm_form';
import { eventBus  } from "../../../../../main";
import Registro from "../../../../../entities/models/modules/reportes/registro.model";


export default {
  name: "demanda_form",
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
  validations: mb.statics('Demanda').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      demanda: mb.instance( 'Demanda'),
      registro: mb.instance( 'Registro'),
      showModalCreatescm: false,
      scm_list: [],
    };
  },
  computed: {
    demandaFeedbacks() {
      return mb.statics('Demanda').feedbacks;
    },
    button_text() {
      return this.demanda.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.demanda = mb.instance( 'Demanda',this.model);
    this.demanda.id_scm = eventBus.idScmSelected;
    console.log("El usuario que va a añadir es: "+ eventBus.user.id_usuario);
      console.log("La entidad del usuario que va a añadir es: "+ eventBus.user.id_entidad);

  },
  components: {

       //Scm_form,
             },
  methods: {
      // openModalCreatescm() {
      //   this.showModalCreatescm = true;
      // },
      // scmAdded(refresh) {
      //   this.showModalCreatescm = false;
      //   refresh?this.refreshscm():'';
      // },
      // async refreshscm() {
      //   this.loading = true;
      //   await this.$refs.select_scm.load();
      //   this.loading = false;
      // },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'demanda_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.demanda.get_id() ? "actualizado" : "añadido";
        this.demanda
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else {
                  if(accion == "añadido"){

                      this.registro.id_usuario = eventBus.user.id_usuario;
                      this.registro.id_entidad = eventBus.user.id_entidad;
                      this.registro.accion = "añadir";
                      this.registro.fecha_registro = new Date();
                      this.registro.tabla = "Demanda";
                      this.registro.atributo = "-";
                      this.registro.proceso = "-";
                      this.registro.intervalo = this.demanda.no_intervalo;

                      this.registro.create();

                  }else if(accion == "actualizado"){

                      this.registro.id_usuario = eventBus.user.id_usuario;
                      this.registro.id_entidad = eventBus.user.id_entidad;
                      this.registro.accion = "modificar";
                      this.registro.fecha_registro = new Date();
                      this.registro.tabla = "Demanda";
                      this.registro.atributo = "-";
                      this.registro.proceso = "-";
                      this.registro.intervalo = this.demanda.no_intervalo;

                      this.registro.create();

                  }

                  !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'demanda_list'}):this.demanda=mb.instance('Demanda');this.load_data();this.$refs.form.vobject.$reset()
              }
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
@import "demanda_form.css";
</style>

