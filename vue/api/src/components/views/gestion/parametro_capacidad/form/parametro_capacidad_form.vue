<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Parametro_capacidad').feedbacks"
        :vobject="$v"
        nested="parametro_capacidad"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor nombre' name='nombre' v-model="parametro_capacidad.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Valor<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor valor'   type_char='dec'  name='valor' v-model="parametro_capacidad.valor"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Capacidad<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Capacidad"
              name="id_capacidad"
              ref="select_capacidad"
              :successFeed="false"
              :defaultValue="parametro_capacidad.id_capacidad"
              v-model="parametro_capacidad.id_capacidad"
              :url="mb.statics('Capacidad').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatecapacidad">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatecapacidad = false"
          v-if="showModalCreatecapacidad"
          class="modal-form"
          :title="'Añadir capacidad'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <capacidad_form :model="null" @close_modal="capacidadAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!parametro_capacidad.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Parametro_capacidad from "../../../../../entities/models/modules/gestion/parametro_capacidad.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Capacidad_form from '../../capacidad/normal/form/capacidad_form';

export default {
  name: "parametro_capacidad_form",
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
  validations: mb.statics('Parametro_capacidad').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      parametro_capacidad: mb.instance( 'Parametro_capacidad'),
      showModalCreatecapacidad: false,
      capacidad_list: [],
    };
  },
  computed: {
    parametro_capacidadFeedbacks() {
      return mb.statics('Parametro_capacidad').feedbacks;
    },
    button_text() {
      return this.parametro_capacidad.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.parametro_capacidad = mb.instance( 'Parametro_capacidad',this.model);

  },
  components: {

       Capacidad_form,
             },
  methods: {
      openModalCreatecapacidad() {
        this.showModalCreatecapacidad = true;
      },
      capacidadAdded(refresh) {
        this.showModalCreatecapacidad = false;
        refresh?this.refreshcapacidad():'';
      },
      async refreshcapacidad() {
        this.loading = true;
        await this.$refs.select_capacidad.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'parametro_capacidad_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.parametro_capacidad.get_id() ? "actualizado" : "añadido";
        this.parametro_capacidad
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'parametro_capacidad_list'}):this.parametro_capacidad=mb.instance('Parametro_capacidad');this.load_data();this.$refs.form.vobject.$reset()
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
@import "parametro_capacidad_form.css";
</style>

