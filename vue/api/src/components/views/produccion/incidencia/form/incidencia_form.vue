<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Incidencia').feedbacks"
        :vobject="$v"
        nested="incidencia"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group p-0 col-12">
        <label>Descripción<span class='required_field'>*</span></label>
        <tc-input :text_area="true" size="large" name="descripcion" v-model="incidencia.descripcion"/>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Fecha de registro<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker name="fecha_registro" v-model="incidencia.fecha_registro"></tc-date-picker>
          </div>
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Proceso<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Proceso"
              name="id_proceso"
              ref="select_proceso"
              :successFeed="false"
              :defaultValue="incidencia.id_proceso"
              v-model="incidencia.id_proceso"
              :url="mb.statics('Proceso').select_2_url"
            />
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateproceso">
            </a-button> -->
          </div>
        </tc-form-item>

        <!-- <a-modal
          @cancel="showModalCreateproceso = false"
          v-if="showModalCreateproceso"
          class="modal-form"
          :title="'Añadir proceso'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <proceso_form :model="null" @close_modal="procesoAdded"/>
        </a-modal> -->
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!incidencia.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Incidencia from "../../../../../entities/models/modules/produccion/incidencia.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
// import Proceso_form from '../../../gestion/proceso/form/proceso_form';

export default {
  name: "incidencia_form",
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
  validations: mb.statics('Incidencia').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      incidencia: mb.instance( 'Incidencia'),
      showModalCreateproceso: false,
      proceso_list: [],
    };
  },
  computed: {
    incidenciaFeedbacks() {
      return mb.statics('Incidencia').feedbacks;
    },
    button_text() {
      return this.incidencia.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.incidencia = mb.instance( 'Incidencia',this.model);

  },
  components: {

       // Proceso_form,
             },
  methods: {
      // openModalCreateproceso() {
      //   this.showModalCreateproceso = true;
      // },
      // procesoAdded(refresh) {
      //   this.showModalCreateproceso = false;
      //   refresh?this.refreshproceso():'';
      // },
      // async refreshproceso() {
      //   this.loading = true;
      //   await this.$refs.select_proceso.load();
      //   this.loading = false;
      // },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'incidencia_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.incidencia.get_id() ? "actualizado" : "añadido";
        this.incidencia
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'incidencia_list'}):this.incidencia=mb.instance('Incidencia');this.load_data();this.$refs.form.vobject.$reset()
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
@import "incidencia_form.css";
</style>

