<template>
  <div class="icons-list">
    <a-tooltip placement="top" v-if="visible_edit" @click="v_instance.onEditing(object)" title="Modificar Elemento">
      <a-icon type="edit" style="padding-right: 5px" theme="twoTone"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="visible_view" title="Mostrar Elemento">
      <a-icon type="eye" style="padding-right: 5px" theme="twoTone" twoToneColor="green"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="visible_delete" title="Borrar Elemento">
      <a-icon type="delete" style="padding-right: 5px" @click="showDeleteConfirm" theme="twoTone"
              twoToneColor="red"/>
    </a-tooltip>
  </div>
</template>
<script>
  import * as utils from '../../../../entities/utils/utils';
  import * as model_factory from "../../../../entities/models";
  import { eventBus } from "../../../../main";
  import * as mb from "../../../../entities/models";
  import Registro from "../../../../entities/models/modules/reportes/registro.model";


  export default {
    name: "action_buttons",
    props: {
      object: Object,
      v_instance: Object,
      class_name: {
        type: String,
        default: "BaseModel"
      },
      visible_edit: {
        type: Boolean,
        default: true
      },
      visible_delete: {
        type: Boolean,
        default: true
      },
      visible_view: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        mb,      // This property is for load static or instance class
        registro: mb.instance( 'Registro'),
        model:{}
      }
    },
    methods: {
      showDeleteConfirm() {
        var idEntidad = 0;

        if(this.class_name == "Proceso"){
            idEntidad = this.model.id_entidad;
        }else if (this.class_name == "Reporte"){
            idEntidad = this.model.proceso.id_entidad;
        }

        if(eventBus.user.id_entidad == idEntidad || eventBus.esGestor || eventBus.esAdmin){
            let _this = this;
            this.$confirm({
                title: 'Desea eliminar este elemento?',
                icon: "delete",
                // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
                okText: 'Yes',
                okType: 'danger',
                class: 'delete_confirm',
                cancelText: 'No',
                 async onOk() {
                    try {

                        _this.registro.id_usuario = eventBus.user.id_usuario;
                        _this.registro.id_entidad = eventBus.user.id_entidad;
                        _this.registro.accion = "eliminar";
                        _this.registro.fecha_registro = new Date();
                        _this.registro.tabla = _this.class_name;

                        switch (_this.registro.tabla){
                            case "Demanda":
                                _this.registro.atributo = "-";
                                _this.registro.nombre_proceso = "-";
                                _this.registro.intervalo = _this.model.no_intervalo;
                                break;

                            case "Proceso":
                                _this.registro.atributo = "-";
                                _this.registro.nombre_proceso = _this.model.nombre;
                                _this.registro.intervalo = "-";
                                break;

                            case "Interrelacion":
                                _this.registro.atributo = "-";
                                _this.registro.nombre_proceso = _this.model.proceso.nombre;
                                _this.registro.intervalo = "-";
                                break;

                            case "Reporte":
                                _this.registro.atributo = "-";
                                _this.registro.nombre_proceso = _this.model.proceso.nombre;
                                _this.registro.intervalo = "-";
                                break;
                        }

                        _this.registro.create();
                        // console.log("la accion fue: "+ _this.registro.accion + "en la tabla: "+ _this.registro.tabla);


                        const response = await _this.model.delete();
                        utils.process_response(response, 'eliminado')
                        _this.v_instance.load_data();
                    } catch (error) {
                        utils.process_error(error)
                    }
                },
                onCancel() {

                },
            });
        }else{
            utils.openNotificationWithIcon(
                        "error",
                        "Eliminar elemento.",
                        "Usted no puede eliminar este elemento."
                    );
        }
      },
    },
    mounted() {
      this.model = model_factory.instance(this.class_name,this.object)
    }
  }
</script>

<style scoped>
  /*.delete_confirm*/

</style>

