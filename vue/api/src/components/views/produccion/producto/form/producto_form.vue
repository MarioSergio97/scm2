<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Producto').feedbacks"
        :vobject="$v"
        nested="producto"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor nombre' name='nombre' v-model="producto.nombre"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Unidad_medida<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Unidad_medida"
              name="id_um"
              ref="select_um"
              :successFeed="false"
              :defaultValue="producto.id_um"
              v-model="producto.id_um"
              :url="mb.statics('Unidad_medida').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateum">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateum = false"
          v-if="showModalCreateum"
          class="modal-form"
          :title="'Añadir unidad_medida'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <unidad_medida_form :model="null" @close_modal="umAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!producto.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Producto from "../../../../../entities/models/modules/produccion/producto.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Unidad_medida_form from '../../../nomencladores/unidad_medida/form/unidad_medida_form';

export default {
  name: "producto_form",
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
  validations: mb.statics('Producto').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      producto: mb.instance( 'Producto'),
      showModalCreateum: false,
      unidad_medida_list: [],
    };
  },
  computed: {
    productoFeedbacks() {
      return mb.statics('Producto').feedbacks;
    },
    button_text() {
      return this.producto.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.producto = mb.instance( 'Producto',this.model);

  },
  components: {

       Unidad_medida_form,
             },
  methods: {
      openModalCreateum() {
        this.showModalCreateum = true;
      },
      umAdded(refresh) {
        this.showModalCreateum = false;
        refresh?this.refreshum():'';
      },
      async refreshum() {
        this.loading = true;
        await this.$refs.select_um.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'producto_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.producto.get_id() ? "actualizado" : "añadido";
        this.producto
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'producto_list'}):this.producto=mb.instance('Producto');this.load_data();this.$refs.form.vobject.$reset()
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
@import "producto_form.css";
</style>

