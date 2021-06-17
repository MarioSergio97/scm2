<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Pais').feedbacks"
        :vobject="$v"
        nested="pais"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor nombre' name='nombre' v-model="pais.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Iso2<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor iso2' name='iso2' v-model="pais.iso2"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Iso3<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor iso3' name='iso3' v-model="pais.iso3"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Prefijo<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor prefijo' name='prefijo' v-model="pais.prefijo"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Continente</label>
        <tc-input placeholder='Ingrese el valor continente' name='continente' v-model="pais.continente"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Subcontinente</label>
        <tc-input placeholder='Ingrese el valor subcontinente' name='subcontinente' v-model="pais.subcontinente"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Iso_moneda</label>
        <tc-input placeholder='Ingrese el valor iso_moneda' name='iso_moneda' v-model="pais.iso_moneda"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre_moneda</label>
        <tc-input placeholder='Ingrese el valor nombre_moneda' name='nombre_moneda' v-model="pais.nombre_moneda"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!pais.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Pais from "../../../../../entities/models/modules/nomencladores/pais.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"

export default {
  name: "pais_form",
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
  validations: mb.statics('Pais').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      pais: mb.instance( 'Pais'),
    };
  },
  computed: {
    paisFeedbacks() {
      return mb.statics('Pais').feedbacks;
    },
    button_text() {
      return this.pais.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.pais = mb.instance( 'Pais',this.model);

  },
  components: {

             },
  methods: {
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'pais_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.pais.get_id() ? "actualizado" : "añadido";
        this.pais
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'pais_list'}):this.pais=mb.instance('Pais');this.load_data();this.$refs.form.vobject.$reset()
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
@import "pais_form.css";
</style>

