<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Proceso').feedbacks"
        :vobject="$v"
        nested="proceso"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Número<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor numero'   type_char='num'  name='numero' v-model="proceso.numero"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Nombre<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el nombre del proceso' name='nombre' v-model="proceso.nombre"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group p-0 col-12">
        <label>Descripción<span class='required_field'>*</span></label>
        <tc-input :text_area="true" size="large" name="descripcion" v-model="proceso.descripcion"/>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Costo del proceso</label>
        <tc-input placeholder='Ingrese el costo del proceso'   type_char='dec'  name='costo_proceso' v-model="proceso.costo_proceso"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Costo de gestion</label>
        <tc-input placeholder='Ingrese el costo de gestión'   type_char='dec'  name='costo_gestion' v-model="proceso.costo_gestion"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Costo de inventario</label>
        <tc-input placeholder='Ingrese el costo de inventario'   type_char='dec'  name='costo_inventario' v-model="proceso.costo_inventario"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Porciento de la demanda total</label>
        <tc-input placeholder='Ingrese el porciento de la demanda total'   type_char='dec'  name='porciento_demanda_total' v-model="proceso.porciento_demanda_total"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Capacidad</label>
        <tc-input placeholder='Ingrese la capacidad'   type_char='dec'  name='capacidad' v-model="proceso.capacidad"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Ciclo del proceso</label>
        <tc-input placeholder='Ingrese el ciclo del proceso'   type_char='num'  name='ciclo_proceso' v-model="proceso.ciclo_proceso"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Proceso sucesor</label>
        <tc-input placeholder='Ingrese el número del proceso sucesor'   type_char='num'  name='procesos_sucesores' v-model="proceso.procesos_sucesores"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Lead time de lanzamiento</label>
        <tc-input placeholder='Ingrese el lead time de lanzamiento'   type_char='dec'  name='it_lanzamiento' v-model="proceso.it_lanzamiento"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Porciento de satisfacción de la demanda</label>
        <tc-input placeholder='Ingrese el porciento de satisfaccion'   type_char='dec'  name='porciento_satisfaccion' v-model="proceso.porciento_satisfaccion"></tc-input>
      </tc-form-item>
        <!-- tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Scm<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione la cadena de suministro"
              name="id_scm"
              ref="select_scm"
              :successFeed="false"
              :defaultValue="proceso.id_scm"
              v-model="proceso.id_scm"
              :url="mb.statics('Scm').select_2_url"
            /> -->
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatescm">
            </a-button> -->
          <!-- </div>
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Tipo de proceso<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el tipo de proceso"
              name="id_tipo_proceso"
              ref="select_tipo_proceso"
              :successFeed="false"
              :defaultValue="proceso.id_tipo_proceso"
              v-model="proceso.id_tipo_proceso"
              :url="mb.statics('Tipo_proceso').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatetipo_proceso">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatetipo_proceso = false"
          v-if="showModalCreatetipo_proceso"
          class="modal-form"
          :title="'Añadir tipo_proceso'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <tipo_proceso_form :model="null" @close_modal="tipo_procesoAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Entidad<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione la Entidad responsable"
              name="id_entidad"
              ref="select_entidad"
              :successFeed="false"
              :defaultValue="proceso.id_entidad"
              v-model="proceso.id_entidad"
              :url="mb.statics('Entidad').select_2_url"
            />
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateentidad">
            </a-button> -->
          </div>
        </tc-form-item>

        <!-- <a-modal
          @cancel="showModalCreateentidad = false"
          v-if="showModalCreateentidad"
          class="modal-form"
          :title="'Añadir entidad'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <entidad_form :model="null" @close_modal="entidadAdded"/>
        </a-modal> -->
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Producto<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el producto"
              name="id_producto"
              ref="select_producto"
              :successFeed="false"
              :defaultValue="proceso.id_producto"
              v-model="proceso.id_producto"
              :url="mb.statics('Producto').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateproducto">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateproducto = false"
          v-if="showModalCreateproducto"
          class="modal-form"
          :title="'Añadir producto'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <producto_form :model="null" @close_modal="productoAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Fecha de registro<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker name="fecha_registro" v-model="proceso.fecha_registro"></tc-date-picker>
          </div>
        </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!proceso.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Proceso from "../../../../../entities/models/modules/gestion/proceso.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
 // import Entidad_form from '../../entidad/form/entidad_form';
  import Producto_form from '../../../produccion/producto/form/producto_form';
//import Scm_form from '../../scm/form/scm_form';
  import Tipo_proceso_form from '../../../nomencladores/tipo_proceso/form/tipo_proceso_form';
import { eventBus  } from "../../../../../main";
import Registro from "../../../../../entities/models/modules/reportes/registro.model";


export default {
  name: "proceso_form",
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
  validations: mb.statics('Proceso').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      proceso: mb.instance( 'Proceso'),
      registro: mb.instance( 'Registro'),
      showModalCreateentidad: false,
      entidad_list: [],
      showModalCreateproducto: false,
      producto_list: [],
      showModalCreatescm: false,
      scm_list: [],
      showModalCreatetipo_proceso: false,
      tipo_proceso_list: [],
    };
  },
  computed: {
    procesoFeedbacks() {
      return mb.statics('Proceso').feedbacks;
    },
    button_text() {
      return this.proceso.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.proceso = mb.instance('Proceso',this.model);
    this.proceso.id_scm = eventBus.idScmSelected;

  },
  components: {

       // Entidad_form,
       Producto_form,
       // Scm_form,
       Tipo_proceso_form,
             },
  methods: {
      // openModalCreateentidad() {
      //   this.showModalCreateentidad = true;
      // },
      // entidadAdded(refresh) {
      //   this.showModalCreateentidad = false;
      //   refresh?this.refreshentidad():'';
      // },
      // async refreshentidad() {
      //   this.loading = true;
      //   await this.$refs.select_entidad.load();
      //   this.loading = false;
      // },
      openModalCreateproducto() {
        this.showModalCreateproducto = true;
      },
      productoAdded(refresh) {
        this.showModalCreateproducto = false;
        refresh?this.refreshproducto():'';
      },
      async refreshproducto() {
        this.loading = true;
        await this.$refs.select_producto.load();
        this.loading = false;
      },
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
      openModalCreatetipo_proceso() {
        this.showModalCreatetipo_proceso = true;
      },
      tipo_procesoAdded(refresh) {
        this.showModalCreatetipo_proceso = false;
        refresh?this.refreshtipo_proceso():'';
      },
      async refreshtipo_proceso() {
        this.loading = true;
        await this.$refs.select_tipo_proceso.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'proceso_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.proceso.get_id() ? "actualizado" : "añadido";
        this.proceso
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
                      this.registro.tabla = "Proceso";
                      this.registro.atributo = "-";
                      this.registro.id_proceso = this.proceso.id_proceso;
                      this.registro.nombre_proceso = this.proceso.nombre;
                      this.registro.intervalo = "-";

                      this.registro.create();

                  }else if(accion == "actualizado"){

                      this.registro.id_usuario = eventBus.user.id_usuario;
                      this.registro.id_entidad = eventBus.user.id_entidad;
                      this.registro.accion = "modificar";
                      this.registro.fecha_registro = new Date();
                      this.registro.tabla = "Proceso";
                      this.registro.atributo = "-";
                      this.registro.id_proceso = this.proceso.id_proceso;
                      this.registro.nombre_proceso = this.proceso.nombre;
                      this.registro.intervalo = "-";

                      this.registro.create();

                  }

                  !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'proceso_list'}):this.proceso=mb.instance('Proceso');
                  this.load_data();this.$refs.form.vobject.$()
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
@import "proceso_form.css";
</style>

