<template>
  <div>
<div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-1">
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <h5 class="text-dark font-weight-bold my-1 mr-5">Perfil de Usuario</h5>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="container">-->
    <!--<div>-->
      <!--<div class="row">-->
        <!--<div class="col-md-6">-->
          <!--<a-button-group style="margin-bottom: 10px">-->
            <!--<a-tooltip placement="topLeft" title="Añadir nuevo elemento">-->
              <!--<a-button icon="plus" type="primary" @click="showModalForm">Añadir</a-button>-->
            <!--</a-tooltip>-->
          <!--</a-button-group>-->
        <!--</div>-->
        <!--<div class="col-md-6" style="text-align: end;">-->
          <!--<div class="form-group">-->
            <!--<div class="input-group mb-3">-->
              <!--<a-tooltip placement="topLeft" title="Buscar..">-->
                <!--<input-->
                  <!--type="text"-->
                  <!--class="form-control form-control-sm"-->
                  <!--v-model="filter"-->
                  <!--placeholder="Buscar"-->
                  <!--aria-label-->
                <!--/>-->
              <!--</a-tooltip>-->
              <!--<div class="input-group-append">-->
                <!--<a-tooltip placement="topLeft" title="Limpiar Filtros">-->
                  <!--<a-button-->
                    <!--style="text-align: end"-->
                    <!--class="rounded-0"-->
                    <!--type="primary"-->
                    <!--@click="filter=''"-->
                  <!--&gt;-->
                    <!--<i class="fa fa-eraser" style="margin-right: 10px" />Limpiar-->
                  <!--</a-button>-->
                <!--</a-tooltip>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
     <!--</div>-->
    <!--</div>-->
   <div>
      <!--<div class="card card-custom">-->
        <!--<div class="card-header py-3">-->
          <!--<div class="col-md-6">-->
            <!--<h6 style="text-align: left">Listado de Usuarios</h6>-->
          <!--</div>-->
          <!--<div class="col-md-6" style="text-align: end;float: right" >-->
            <!--<div class="row">-->
              <!--<div class="col-md-3">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

       <!--Contenido nuevo-->
       <div class="card card-custom shadow p-5">
           <div>
               <h5>Nombre: {{data[0].nombre}}</h5>
               <h5>Email: {{data[0].email}}</h5>
               <h5>Teléfono: {{data[0].telefono}}</h5>
               <h5>Entidad: {{data[0].entidad.nombre}}</h5>
               <h5>Cargo en la entidad: {{data[0].cargo_empresa}}</h5>
               <h5>Rol en el sistema: {{data[0].rol.role}}</h5>
               <h5>Perfil: {{data[0].perfil}}</h5>

               <div class="mt-5">
                   <action_buttons :object="data[0]" :visible_view="false" :v_instance="self" :class_name="selected_model.class_name()"/>
               </div>
           </div>
       </div>


      <a-modal
        @cancel="onCloseModal"
        :title="selected_model.get_id()?'Actualizar usuario':'Añadir usuario'"
        class="modal-form"
        width="55rem"
        :visible="show_modal_form"
        :destroyOnClose="true"
        on-ok="handleOk"
        :header="null"
        :footer="null"
        :maskClosable="false"

      >
        <usuario_form  :modal=true :model="selected_model" />
      </a-modal>

      <!--<a-table-->
        <!--:columns="columns"-->
        <!--:rowKey="record => record.id_usuario"-->
        <!--:dataSource="data"-->
        <!--:rowSelection="rowSelection"-->
        <!--:loading="loading"-->
        <!--:pagination="pagination.$data"-->
        <!--:scroll="{ x: '110%', y: 240 }"-->
      <!--&gt;-->
        <!--<a slot="action" slot-scope="record" href="javascript:">-->
          <!--<action_buttons :object="record" :visible_view="false" :v_instance="self" :class_name="selected_model.class_name()"/>-->
        <!--</a>-->
      <!--</a-table>-->
    </div>
  </div>
</template>

<script>
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models";
import action_buttons from "../../../../shared/table/action_buttons/action_buttons";
import pagination_functions from "../../../../shared/table/pagination/pagination_options";
import vantdpagination from "../../../../shared/table/pagination/antd_pagination";
import usuario_form from "../form/perfil_form";
import { eventBus  } from "../../../../../main";

export default {
  name: "usuario_list",
    provide: function(){
      return{
        close_modal: this.onCloseModal,
        load_data: this.load_data
      }
    },
  data() {
    return {
      data: [],
      self: null,
      usuario_list: [],
      filter: null,
      columns: mb.statics('Usuario').columns,
      loading: false,
      text_select: "Select All",
      selectedRowKeys: [],
      pagination: vantdpagination,
      selected_model: mb.instance( 'Usuario'),
      show_modal_form: false,
      mb
    };
  },
  components: {
    action_buttons,
    pagination_functions,
    vantdpagination,
    usuario_form
  },
  watch: {
    filter: function() {
      this.data = this.usuario_list.data.filter(this.filter_data);
    },
    selectedRowKeys: function() {
      if (this.selectedRowKeys.length == this.data.length) {
        this.text_select = "Desseleccionar todo";
      } else {
        this.text_select = "Seleccionar todo";
      }
    }
  },
  computed: {
    rowSelection() {
      // const { selectedRowKeys } = this;
      // return {
      //   selectedRowKeys,
      //   hideDefaultSelections: true,
      //   selections: [
      //     {
      //       key: "all-data",
      //       text: this.text_select,
      //       onSelect: () => {
      //         if (this.selectedRowKeys.length == this.data.length) {
      //           this.selectedRowKeys = [];
      //         } else {
      //           this.selectedRowKeys = this.data.map(e => {
      //             return e.id_usuario;
      //           });
      //         }
      //       }
      //     }
      //   ],
      //   onSelection: this.onSelection,
      //   onChange: this.onChange
      // };
    }
  },
  methods: {
    exportToExcel () {
      utils.exportToExcelVinstance(this)
    },
    exportToCSV () {
      utils.exportToCSV(this)
    },
    onCloseModal(e,reload_data=false) {
      this.selected_model = mb.instance('Usuario');
      this.show_modal_form = false;
      reload_data?this.load_data():''
    },
    showModalForm() {
      this.show_modal_form = !this.show_modal_form;
    },
    filter_data(object) {
      return utils.filter_object_column(object, this.filter,this.columns);
    },
    onChange: function(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    showDeleteConfirm() {
      if (this.selectedRowKeys.length == 0) {
        utils.openNotificationWithIcon(
          "error",
          "Eliminar elementos seleccionados",
          "Debe seleccionar al menos un elemento"
        );
        return;
      }
      let _this = this;
      this.$confirm({
        title: "¿Eliminar elementos seleccionados?",
        icon: "delete",
        // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
        okText: "Si",
        okType: "danger",
        class: "delete_confirm",
        cancelText: "No",
        async onOk() {
          try {
            const response = await mb.statics('Usuario').delete_by_ids(
                _this.selectedRowKeys
              );
               utils.process_response(response, "eliminado");
              _this.selectedRowKeys=[];
              _this.load_data();
            } catch (error) {
              utils.process_error(error);
              _this.selectedRowKeys=[];
            }
        },
        onCancel() {}
      });
    },
    async load_data() {
      try {
        this.loading = true;
        var params = {"attr": {"id_usuario": + eventBus.user.id_usuario} };
        params.relations=['entidad','rol'];

        const resp = await mb.statics('Usuario').list(params);
        this.usuario_list = resp;
        this.data = this.usuario_list.data.filter(this.filter_data);
        this.data[0].perfil = true
        console.log('El perfil es: '+this.data[0].perfil)
        this.loading = false;
      } catch (error) {
        utils.process_error(error);
        this.loading = false;
      }
    },


    onEditing(model) {
      this.selected_model = mb.instance('Usuario',model);
        console.log(this.selected_model);
      this.showModalForm();
    }
  },

  mounted() {
    this.loading = true;
    this.data = [];
    this.load_data();
    this.self = this;
    this.pagination.$options.props = {
      load_data: this.load_data
    };
  }
};
</script>

<style>
@import "perfil_list.css";
</style>

