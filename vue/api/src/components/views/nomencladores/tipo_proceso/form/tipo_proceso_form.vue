<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Tipo_proceso').feedbacks"
        :vobject="$v"
        nested="tipo_proceso"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor nombre' name='nombre' v-model="tipo_proceso.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group p-0 col-12">
        <label>Descripcion<span class='required_field'>*</span></label>
        <tc-input :text_area="true" size="large" name="descripcion" v-model="tipo_proceso.descripcion"/>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!tipo_proceso.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Tipo_proceso from "../../../../../entities/models/modules/nomencladores/tipo_proceso.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"

export default {
  name: "tipo_proceso_form",
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
  validations: mb.statics('Tipo_proceso').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      tipo_proceso: mb.instance( 'Tipo_proceso'),
    };
  },
  computed: {
    tipo_procesoFeedbacks() {
      return mb.statics('Tipo_proceso').feedbacks;
    },
    button_text() {
      return this.tipo_proceso.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.tipo_proceso = mb.instance( 'Tipo_proceso',this.model);

  },
  components: {

             },
  methods: {
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'tipo_proceso_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.tipo_proceso.get_id() ? "actualizado" : "añadido";
        this.tipo_proceso
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'tipo_proceso_list'}):this.tipo_proceso=mb.instance('Tipo_proceso');this.load_data();this.$refs.form.vobject.$reset()
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
@import "tipo_proceso_form.css";
</style>

