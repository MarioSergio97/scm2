<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Reporte').feedbacks"
        :vobject="$v"
        nested="reporte"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Real acumulado hasta la fecha en lanzamiento<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor real acumulado' type_char='dec'  name='lanzamiento' v-model="reporte.lanzamiento"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Real acumulado hasta la fecha en Entregado<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor real acumulado'   type_char='dec'  name='entregado' v-model="reporte.entregado"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Proceso<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el proceso"
              name="id_proceso"
              ref="select_proceso"
              :successFeed="false"
              :defaultValue="reporte.id_proceso"
              v-model="reporte.id_proceso"
              :url="mb.statics('Proceso').select_2_url"
              :search_params= params
            />
            <!-- <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateproceso">
            </a-button> -->
          </div>
        </tc-form-item>

       <!--  <a-modal
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
      <button v-if="!reporte.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Reporte from "../../../../../entities/models/modules/gestion/reporte.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
import Registro from "../../../../../entities/models/modules/reportes/registro.model";
import { eventBus  } from "../../../../../main";
//import Proceso_form from '../../proceso/form/proceso_form';
import Proceso from "../../../../../entities/models/modules/gestion/proceso.model";

export default {
  name: "reporte_form",
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
  validations: mb.statics('Reporte').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      reporte: mb.instance( 'Reporte'),
      registro: mb.instance( 'Registro'),
      proceso_model: mb.instance( 'Proceso'),
      showModalCreateproceso: false,
      proceso_list: [],
      params: {"attr": {"id_scm": + eventBus.idScmSelected} }
    };
  },
  computed: {
    reporteFeedbacks() {
      return mb.statics('Reporte').feedbacks;
    },
    button_text() {
      return this.reporte.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.reporte = mb.instance( 'Reporte',this.model);

  },
  components: {

       //Proceso_form,
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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'reporte_list'})
       }
      },

    async prueba (accion,response,and_new){
        console.log("Entro a la funcion prueba");
        if(utils.process_response(response,accion)) {
            if (!this.model && !and_new && this.modal) {

                this.$emit('close_modal',true)
                return;
            }
            else{

                if(accion == "añadido"){

                    var proces = {"attr": {"id_proceso": this.reporte.id_proceso}};
                    const pro =  await mb.statics('Proceso').list(proces);

                    this.registro.id_usuario = eventBus.user.id_usuario;
                    this.registro.id_entidad = eventBus.user.id_entidad;
                    this.registro.accion = "añadir";
                    this.registro.fecha_registro = new Date();
                    this.registro.tabla = "Reporte";
                    this.registro.atributo = "-";
                    this.registro.nombre_proceso = pro.data[0].nombre;
                    this.registro.intervalo = "-";

                    this.registro.create();

                }else if(accion == "actualizado"){

                    var proces = {"attr": {"id_proceso": this.reporte.id_proceso}};
                    const pro =  await mb.statics('Proceso').list(proces);

                    this.registro.id_usuario = eventBus.user.id_usuario;
                    this.registro.id_entidad = eventBus.user.id_entidad;
                    this.registro.accion = "modificar";
                    this.registro.fecha_registro = new Date();
                    this.registro.tabla = "Reporte";
                    this.registro.atributo = "-";
                    this.registro.nombre_proceso = pro.data[0].nombre;
                    this.registro.intervalo = "-";

                    this.registro.create();

                }

                !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'reporte_list'}):this.reporte=mb.instance('Reporte');this.load_data();this.$refs.form.vobject.$reset()
            }

        }
        this.loading = false;
    },

    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.reporte.get_id() ? "actualizado" : "añadido";
        this.reporte
          .save()
          .then((response) => this.prueba(accion,response,and_new))
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
@import "reporte_form.css";
</style>

