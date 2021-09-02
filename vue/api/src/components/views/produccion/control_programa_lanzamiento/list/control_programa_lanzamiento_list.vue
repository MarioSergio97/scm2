<template>
  <div>
<div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h5 class="text-dark font-weight-bold my-1 mr-5">Control del programa de lanzamiento</h5>
            <!--end::Page Title-->
            <!--begin::Breadcrumb-->
            <!--<ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">-->
              <!--<li class="breadcrumb-item">-->
                <!--<a href="/" class="text-muted">Inicio</a>-->
              <!--</li>-->
              <!--<li class="breadcrumb-item">-->
                <!--<a href="/" class="text-muted">Producción</a>-->
              <!--</li>-->
              <!--<li class="breadcrumb-item">-->
                <!--<a href="" class="text-muted">Control del programa de lanzamiento</a>-->
              <!--</li>-->
            <!--</ul>-->
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div>
      <div class="row">
        <div class="col-md-6">
          <!--<a-button-group style="margin-bottom: 10px">-->
            <!--<a-tooltip placement="topLeft" title="Añadir nuevo elemento">-->
              <!--<a-button icon="plus" type="primary">Añadir</a-button>-->
            <!--</a-tooltip>-->
            <!--<a-tooltip placement="topLeft" title="Eliminar elementos seleccionados">-->
              <!--<a-button icon="delete" type="danger">Eliminar</a-button>-->
            <!--</a-tooltip>-->
          <!--</a-button-group>-->
        </div>
        <div class="col-md-6" style="text-align: end;">
          <div class="form-group">
            <div class="input-group mb-3">
              <a-tooltip placement="topLeft" title="Buscar..">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="filter"
                  placeholder="Buscar"
                  aria-label
                />
              </a-tooltip>
              <div class="input-group-append">
                <a-tooltip placement="topLeft" title="Limpiar Filtros">
                  <a-button
                    style="text-align: end"
                    class="rounded-0"
                    type="primary"
                    @click="filter=''"
                  >
                    <i class="fa fa-eraser" style="margin-right: 10px" />Limpiar
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
   <div>
      <div class="card card-custom">
        <div class="card-header py-3">
          <div class="col-md-6">
            <h6 style="text-align: left">Listado de control del programa de lanzamiento</h6>
          </div>
          <!--<div class="col-md-6" style="text-align: end;float: right" >-->
            <!--<div class="row">-->
              <!--<div class="col-md-8" style="text-align: end">-->
                <!--<p class="card-label" style="text-align: end;margin-top:10px">-->
                  <!--Elementos seleccionados  {{selectedRowKeys.length}}/{{data.length}}-->
                <!--</p>-->
              <!--</div>-->
              <!--<div class="col-md-3">-->
                <!--<a-dropdown-button style="margin-left: 45%;" >-->
                  <!--Exportar-->
                  <!--<a-menu slot="overlay">-->
                    <!--<a-menu-item key="1" @click="exportToExcel"><a-icon type="file-excel" theme="twoTone" twoToneColor="#52c41a" />EXCEL</a-menu-item>-->
                    <!--<a-menu-item key="2" @click=""><a-icon type="file-pdf" theme="twoTone" twoToneColor="#c41c33" />PDF</a-menu-item>-->
                    <!--<a-menu-item key="3" @click="exportToCSV"><a-icon type="file-text" theme="twoTone" twoToneColor="#2771c4" />CSV</a-menu-item>-->
                  <!--</a-menu>-->
                <!--</a-dropdown-button>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <!--<a-modal-->
        <!--@cancel="onCloseModal"-->
        <!--:title="selected_model.get_id()?'Actualizar demanda':'Añadir demanda'"-->
        <!--class="modal-form"-->
        <!--width="55rem"-->
        <!--:visible="show_modal_form"-->
        <!--:destroyOnClose="true"-->
        <!--on-ok="handleOk"-->
        <!--:header="null"-->
        <!--:footer="null"-->
        <!--:maskClosable="false"-->

      <!--&gt;-->
        <!--<demanda_form  :modal=true :model="selected_model" />-->
      <!--</a-modal>-->

      <a-table
        :columns="columns"
        :rowKey="record => record.id_control"
        :dataSource="data"
        :rowSelection="rowSelection"
        :loading="loading"
        :pagination="pagination.$data"
        :scroll="{ x: '130%', y: 240 }"
      >
        <a slot="action" slot-scope="record" href="javascript:;">
          <action_buttons :object="record" :visible_view="false" :v_instance="self" :class_name="selected_model.class_name()"/>
        </a>
      </a-table>
    </div>
</template>

<script>

import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models";
import action_buttons from "../../../../shared/table/action_buttons/action_buttons";
import pagination_functions from "../../../../shared/table/pagination/pagination_options";
import vantdpagination from "../../../../shared/table/pagination/antd_pagination";
import { eventBus  } from "../../../../../main";


export default {
  name: "control_programa_lanzamiento_list",
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
      control_list: [],
      filter: null,
      columns: mb.statics('Control').columns,
      loading: false,
      text_select: "Select All",
      selectedRowKeys: [],
      pagination: vantdpagination,
      selected_model: mb.instance( 'Demanda'),
      show_modal_form: false,
      mb,
      prueba:[],
    };
  },

  components: {
    action_buttons,
    pagination_functions,
    vantdpagination,
  },

  // watch: {
  //   filter: function() {
  //     this.data = this.demanda_list.data.filter(this.filter_data);
  //   },
  //   selectedRowKeys: function() {
  //     if (this.selectedRowKeys.length == this.data.length) {
  //       this.text_select = "Desseleccionar todo";
  //     } else {
  //       this.text_select = "Seleccionar todo";
  //     }
  //   }
  // },
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
      //             return e.id_demanda;
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
    // exportToExcel () {
    //   utils.exportToExcelVinstance(this)
    // },
    // exportToCSV () {
    //   utils.exportToCSV(this)
    // },
    // onCloseModal(e,reload_data=false) {
    //   this.selected_model = mb.instance('Demanda');
    //   this.show_modal_form = false;
    //   reload_data?this.load_data():''
    // },
    // showModalForm() {
    //   this.show_modal_form = !this.show_modal_form;
    // },
    filter_data(object) {
      return utils.filter_object_column(object, this.filter,this.columns);
    },
    // onChange: function(selectedRowKeys) {
    //   this.selectedRowKeys = selectedRowKeys;
    // },
    // showDeleteConfirm() {
    //   if (this.selectedRowKeys.length == 0) {
    //     utils.openNotificationWithIcon(
    //       "error",
    //       "Eliminar elementos seleccionados",
    //       "Debe seleccionar al menos u elemento"
    //     );
    //     return;
    //   }
    //   let _this = this;
    //   this.$confirm({
    //     title: "Eliminar elementos seleccionados?",
    //     icon: "delete",
    //     // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
    //     okText: "Si",
    //     okType: "danger",
    //     class: "delete_confirm",
    //     cancelText: "No",
    //     async onOk() {
    //       try {
    //         const response = await mb.statics('Demanda').delete_by_ids(
    //             _this.selectedRowKeys
    //           );
    //            utils.process_response(response, "deleted");
    //           _this.selectedRowKeys=[];
    //           _this.load_data();
    //         } catch (error) {
    //           utils.process_error(error);
    //           _this.selectedRowKeys=[];
    //         }
    //     },
    //     onCancel() {}
    //   });
    // },
    async load_data() {
      try {
        this.loading = true;
        var lista_procesos = eventBus.listProces;
        var id_scm_selected = eventBus.idScmSelected;

          /****Aqui cargo la demanda****/
          var params1 = {"attr": {"id_scm": + id_scm_selected}};
          params1.relations=['scm'];
          const resp1 = await mb.statics('Demanda').list(params1);
          var demanda = resp1.data.filter(this.filter_data);

          /****Aqui cargo los procesos de la scm****/
        var params = { "attr": { "id_proceso": lista_procesos} };
        params.relations=['entidad','producto','scm','tipo_proceso'];
        const resp = await mb.statics('Proceso').list(params);
        var procesosServ = resp.data.filter(this.filter_data);
        var procesos=[];
        for(var i=0; i<procesosServ.length; i++){
              procesos[i] = mb.instance('Proceso',procesosServ[i]);

              /****Aqui cargo la interrelacion del proceso****/
              params = {"attr": {"id_proceso": procesos[i].id_proceso} };
              params.relations=['proceso'];
              var par = await mb.statics('Interrelacion').list(params);
              var interrelacionServ = par.data.filter(this.filter_data);
              var interrelacion = mb.instance('Interrelacion',interrelacionServ[0]);

              /****Aqui calculo el indice de Actividad del proceso****/
              procesos[i].calcularIndiceActividad(interrelacion.general);
        }

          /****Aqui cargo el programa de lanzamiento****/
          var programaLanzamiento =[];

          for(var i=0; i<demanda.length; i++){
              programaLanzamiento[i] = mb.instance('ProgramaLanzamiento');
              programaLanzamiento[i].setAtributosDemanda(demanda[i].no_intervalo,demanda[i].demanda_final);
              if(i!=0){
                  programaLanzamiento[i].calcularDemandaAcumulada(programaLanzamiento[i-1].demanda_acumulada);
              }else{
                  programaLanzamiento[i].calcularDemandaAcumulada(0);
              };
              programaLanzamiento[i].setProcesos(procesos);
          };

          /****Aqui se calcula el lanzamiento acumulado del programa de lanzamiento****/
          for(var i=0; i<programaLanzamiento.length; i++){
              var listLA=[];
              for(var j=0; j<programaLanzamiento[i].procesos.length; j++){
                  var demAc;
                  var ni;
                  ni = programaLanzamiento[i].buscarNI(programaLanzamiento[i].procesos[j].it_lanzamiento);
                  var enco=false;
                  for(var m=0; m<programaLanzamiento.length && !enco; m++){
                      if(programaLanzamiento[m].no_intervalo == ni){
                          demAc = programaLanzamiento[m].demanda_acumulada;
                          enco = true;
                      }else {
                          demAc=0;
                      };
                  };
                  var lanAcum = programaLanzamiento[i].calcularLanzAcumulado(demAc,programaLanzamiento[i].procesos[j].indice_actividad,programaLanzamiento[i].procesos[j].porciento_demanda_total);
                  listLA[j]=lanAcum;
              };
              // this.prueba[i]=listLA;
              programaLanzamiento[i].setLanzamientoAcumulado(listLA);
          };


          /****Aqui creo el control del programa de lanzamiento****/
          var controlLanzamiento=[];

          for(var i=0; i<procesos.length; i++){
              controlLanzamiento[i] = mb.instance('Control');

              /****Aqui creo el reporte del proceso****/
              params = {"attr": {"id_proceso": procesos[i]}};
              params.relations=['proceso'];
              var report = await mb.statics('Reporte').list(params);
              var reportes = report.data.filter(this.filter_data);

              controlLanzamiento[i].setProceso(procesos[i]);
              controlLanzamiento[i].setEstadoFlujo(10);

              var enc = false;
              for(var j=0; j<reportes.length && !enc; j++){
                  if (controlLanzamiento[i].proceso.id_proceso == reportes[j].proceso.id_proceso){
                      controlLanzamiento[i].setRealAcumulado(reportes[j].lanzamiento);
                      enc=true;
                  }
              };

              /***Calcular Plan acumulado de lanzamiento***/

              var encontrado = false;
              if(programaLanzamiento != null){
                  if(programaLanzamiento[controlLanzamiento[i].estado_flujo-1] != null ){
                      for(var j=0; j<programaLanzamiento[controlLanzamiento[i].estado_flujo-1].procesos.length && !encontrado; j++){
                          if(programaLanzamiento[controlLanzamiento[i].estado_flujo-1].procesos[j].id_proceso == controlLanzamiento[i].proceso.id_proceso){
                              controlLanzamiento[i].plan_acumulado_lanzamiento = programaLanzamiento[controlLanzamiento[i].estado_flujo-1].lanzamiento_acumulado[j];
                              encontrado = true;
                          }else {
                              controlLanzamiento[i].plan_acumulado_lanzamiento = '#N/A';
                          }
                      }
                  }

              }

              controlLanzamiento[i].calcularPorcientoCumplimiento();
              controlLanzamiento[i].calcularDefici();
              controlLanzamiento[i].determinarEstado();

              /***Determinar el intervalo hasta el cual esta asegurado***/

              var enc3 = false;
              for(var j=0; j<programaLanzamiento.length && !enc3; j++){
                  var enc2=false;
                  for(var m=0; m<programaLanzamiento[j].procesos.length && !enc2; m++){
                      if(programaLanzamiento[j].procesos[m].id_proceso == controlLanzamiento[i].proceso.id_proceso){
                          enc2 = true;
                          if(programaLanzamiento[j].lanzamiento_acumulado[m]<=controlLanzamiento[i].real_acumulado_lanzamiento){
                              //this.prueba[i]= programaLanzamiento[j].lanzamiento_acumulado;
                              controlLanzamiento[i].asegurado_hasta_intervalo = programaLanzamiento[j].no_intervalo;
                          }else {
                              enc3 = true;
                          }
                      }
                  }
              }
          }

        this.data = controlLanzamiento;
        this.loading = false;
      } catch (error) {
        utils.process_error(error);
        this.loading = false;
      }
    },


  //   onEditing(model) {
  //     this.selected_model = mb.instance('Demanda',model);
  //     this.showModalForm();
  //   }
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
@import "control_programa_lanzamiento_list.css";
</style>

