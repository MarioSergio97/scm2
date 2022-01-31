<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Scm').feedbacks"
        :vobject="$v"
        nested="scm"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el nombre' name='nombre' v-model="scm.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group p-0 col-12">
        <label>Descripción<span class='required_field'>*</span></label>
        <tc-input  placeholder='Ingrese la descripción de la cadena de suministro' :text_area="true" size="large" name="descripcion" v-model="scm.descripcion"/>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Fecha de registro<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker  placeholder='Ingrese la fecha' name="fecha_registro" v-model="scm.fecha_registro"></tc-date-picker>
          </div>
        </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Unidad de tiempo de la demanda<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='unidad_tiempo_demanda' v-model="scm.unidad_tiempo_demanda"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Norma de inventario total en la cadena<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='norma_inventario_total_cadena' v-model="scm.norma_inventario_total_cadena"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Intervalo número del control<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='intervalo_numero_control' v-model="scm.intervalo_numero_control"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Entidad<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione la entidad encargada"
              name="id_entidad_gestora"
              ref="select_entidad_gestora"
              :successFeed="false"
              :defaultValue="scm.id_entidad_gestora"
              v-model="scm.id_entidad_gestora"
              :url="mb.statics('Entidad').select_2_url"
            />
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateentidad_gestora">
            </a-button> -->
          </div>
        </tc-form-item>

       <!--  <a-modal
          @cancel="showModalCreateentidad_gestora = false"
          v-if="showModalCreateentidad_gestora"
          class="modal-form"
          :title="'Añadir entidad'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <entidad_form :model="null" @close_modal="entidad_gestoraAdded"/>
        </a-modal> -->
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <!--<button v-if="!scm.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>-->
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Scm from "../../../../../entities/models/modules/gestion/scm.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
// import Entidad_form from '../../entidad/form/entidad_form';

export default {
  name: "scm_form",
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
  validations: mb.statics('Scm').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      scm: mb.instance( 'Scm'),
      showModalCreateentidad_gestora: false,
      entidad_list: [],
    };
  },
  computed: {
    scmFeedbacks() {
      return mb.statics('Scm').feedbacks;
    },
    button_text() {
      return this.scm.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.scm = mb.instance( 'Scm',this.model);

  },
  components: {

       // Entidad_form,
             },
  methods: {
      // openModalCreateentidad_gestora() {
      //   this.showModalCreateentidad_gestora = true;
      // },
      // entidad_gestoraAdded(refresh) {
      //   this.showModalCreateentidad_gestora = false;
      //   refresh?this.refreshentidad_gestora():'';
      // },
      // async refreshentidad_gestora() {
      //   this.loading = true;
      //   await this.$refs.select_entidad_gestora.load();
      //   this.loading = false;
      // },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'scm_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.scm.get_id() ? "actualizado" : "añadido";
        this.scm
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'scm_list'}):this.scm=mb.instance('Scm');this.load_data();this.$refs.form.vobject.$reset()
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
@import "scm_form.css";
</style>

