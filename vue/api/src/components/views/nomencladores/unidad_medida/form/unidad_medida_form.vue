<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Unidad_medida').feedbacks"
        :vobject="$v"
        nested="unidad_medida"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor nombre' name='nombre' v-model="unidad_medida.nombre"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!unidad_medida.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Unidad_medida from "../../../../../entities/models/modules/nomencladores/unidad_medida.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"

export default {
  name: "unidad_medida_form",
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
  validations: mb.statics('Unidad_medida').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      unidad_medida: mb.instance( 'Unidad_medida'),
    };
  },
  computed: {
    unidad_medidaFeedbacks() {
      return mb.statics('Unidad_medida').feedbacks;
    },
    button_text() {
      return this.unidad_medida.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.unidad_medida = mb.instance( 'Unidad_medida',this.model);

  },
  components: {

             },
  methods: {
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'unidad_medida_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.unidad_medida.get_id() ? "actualizado" : "añadido";
        this.unidad_medida
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'unidad_medida_list'}):this.unidad_medida=mb.instance('Unidad_medida');this.load_data();this.$refs.form.vobject.$reset()
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
@import "unidad_medida_form.css";
</style>

