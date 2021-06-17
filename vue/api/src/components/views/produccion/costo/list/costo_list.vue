<template>
  <div>
<div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h5 class="text-dark font-weight-bold my-1 mr-5">Costo</h5>
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
                <!--<a href="" class="text-muted">Costo</a>-->
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
            <h6 style="text-align: left">Listado de Costos</h6>
          </div>
          <!-- <div class="col-md-6" style="text-align: end;float: right" >
            <div class="row">
              <div class="col-md-8" style="text-align: end">
                <p class="card-label" style="text-align: end;margin-top:10px">
                  Elementos seleccionados  {{selectedRowKeys.length}}/{{data.length}}
                </p>
              </div> -->
              <!-- <div class="col-md-3">
                <a-dropdown-button style="margin-left: 45%;" >
                  Exportar
                  <a-menu slot="overlay">
                    <a-menu-item key="1" @click="exportToExcel"><a-icon type="file-excel" theme="twoTone" twoToneColor="#52c41a" />EXCEL</a-menu-item>
                    <a-menu-item key="2" @click=""><a-icon type="file-pdf" theme="twoTone" twoToneColor="#c41c33" />PDF</a-menu-item>
                    <a-menu-item key="3" @click="exportToCSV"><a-icon type="file-text" theme="twoTone" twoToneColor="#2771c4" />CSV</a-menu-item>
                  </a-menu>
                </a-dropdown-button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <!-- <a-modal
        @cancel="onCloseModal"
        :title="selected_model.get_id()?'Actualizar costo':'Añadir costo'"
        class="modal-form"
        width="55rem"
        :visible="show_modal_form"
        :destroyOnClose="true"
        on-ok="handleOk"
        :header="null"
        :footer="null"
        :maskClosable="false"

      >
        <costo_form  :modal=true :model="selected_model" />
      </a-modal> -->

      <a-table
        :columns="columns"
        :rowKey="record => record.id_costo"
        :dataSource="data"        
        :loading="loading"
        :pagination="pagination.$data"
        :scroll="{ x: '130%', y: 240 }"
      >
        <a slot="action" slot-scope="record" href="javascript:;">
          <action_buttons :object="record" :visible_view="false" :v_instance="self" :class_name="selected_model.class_name()"/>
        </a>
      </a-table>
    </div>
  </div>
  </div>
</template>

<script>
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models";
import action_buttons from "../../../../shared/table/action_buttons/action_buttons";
import pagination_functions from "../../../../shared/table/pagination/pagination_options";
import vantdpagination from "../../../../shared/table/pagination/antd_pagination";
import { eventBus  } from "../../../../../main";
// import costo_form from "../form/costo_form";

export default {
  name: "costo_list",
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
      costo_list: [],
      filter: null,
      columns: mb.statics('Costo').columns,
      loading: false,
      text_select: "Select All",
      // selectedRowKeys: [],
      pagination: vantdpagination,
      selected_model: mb.instance( 'Costo'),
      show_modal_form: false,
      mb,
      id_procesos_list:[],
      listaProcesos:[],
      // id_demandas_list:[],
      // id_inventario_list:[],
      // id_inventario_ajustado_list:[],
      lista_general:[],
      costoGestion:'noPincha',
      demFT:0,
      demAT:0,
      invT:[],
      invAT:[],

    };
  },
  components: {
    action_buttons,
    pagination_functions,
    vantdpagination,
    // costo_form
  },
  watch: {
    filter: function() {
      this.data = this.costo_list.data.filter(this.filter_data);
    },
    selectedRowKeys: function() {
      if (this.selectedRowKeys.length == this.data.length) {
        this.text_select = "Desseleccionar todo";
      } else {
        this.text_select = "Seleccionar todo";
      }
    }
  },
  // computed: {
  //   rowSelection() {
  //     const { selectedRowKeys } = this;
  //     return {
  //       selectedRowKeys,
  //       hideDefaultSelections: true,
  //       selections: [
  //         {
  //           key: "all-data",
  //           text: this.text_select,
  //           onSelect: () => {
  //             if (this.selectedRowKeys.length == this.data.length) {
  //               this.selectedRowKeys = [];
  //             } else {
  //               this.selectedRowKeys = this.data.map(e => {
  //                 return e.id_costo;
  //               });
  //             }
  //           }
  //         }
  //       ],
  //       onSelection: this.onSelection,
  //       onChange: this.onChange
  //     };
  //   }
  // },
  methods: {
    // exportToExcel () {
    //   utils.exportToExcelVinstance(this)
    // },
    // exportToCSV () {
    //   utils.exportToCSV(this)
    // },
    // onCloseModal(e,reload_data=false) {
    //   this.selected_model = mb.instance('Costo');
    //   this.show_modal_form = false;
    //   reload_data?this.load_data():''
    // },
    // // showModalForm() {
    // //   this.show_modal_form = !this.show_modal_form;
    // // },
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
    //       "Debe seleccionar al menos un elemento"
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
    //         const response = await mb.statics('Costo').delete_by_ids(
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
        this.id_scm_selected = eventBus.idScmSelected;
        
       /****Aqui cargo la demanda****/
          var params = {"attr": {"id_scm": + this.id_scm_selected}};
          params.relations=['scm'];
          const resp = await mb.statics('Demanda').list(params);
          this.data = resp.data.filter(this.filter_data);

          /****Aqui cargo los procesos****/
          var params2 = {"attr": {"id_scm": + this.id_scm_selected}};
          params2.relations=['entidad','producto','scm','tipo_proceso'];
          var resp2 = await mb.statics('Proceso').list(params2);
          var procesosServ = resp2.data.filter(this.filter_data);
          var procesos=[];
          for(var i=0; i<procesosServ.length; i++){
              procesos[i] = mb.instance('Proceso',procesosServ[i]);

          /****Aqui cargo la interrelacion del proceso****/
              params2 = {"attr": {"id_proceso": procesos[i].id_proceso} };
              params2.relations=['proceso'];
              var par = await mb.statics('Interrelacion').list(params2);
              var interrelacionServ = par.data.filter(this.filter_data);
              var interrelacion = mb.instance('Interrelacion',interrelacionServ[0]);

              /****Aqui calculo el indice de Actividad del proceso****/
              procesos[i].calcularIndiceActividad(interrelacion.general);
              this.listaProcesos[i] = procesos[i].nombre;
          }

          /****Aqui cargo el programa de entrega****/
          var programaEntrega =[];

          for(var i=0; i<this.data.length; i++){
              programaEntrega[i] = mb.instance('ProgramaEntrega');
              programaEntrega[i].setAtributosDemanda(this.data[i].no_intervalo,this.data[i].demanda_final);
              if(i!=0){
                  programaEntrega[i].calcularDemandaAcumulada(programaEntrega[i-1].demanda_acumulada);
              }else{
                  programaEntrega[i].calcularDemandaAcumulada(0);
              };
              programaEntrega[i].setProcesos(procesos);
          };


          for(var i=0; i<programaEntrega.length; i++){
              var listEA=[];
              for(var j=0; j<programaEntrega[i].procesos.length; j++){
                  var demAc;
                  var ni;
                  ni = programaEntrega[i].buscarNI(programaEntrega[i].procesos[j].lt_entrega);
                  var enco=false;
                  for(var m=0; m<programaEntrega.length && !enco; m++){
                      if(programaEntrega[m].no_intervalo == ni){
                          demAc = programaEntrega[m].demanda_acumulada;
                          enco = true;
                      }else {
                          demAc=0;
                      };
                  };
                  var entregaAcum = programaEntrega[i].calcularEntregaAcumulada(demAc,programaEntrega[i].procesos[j].indice_actividad,programaEntrega[i].procesos[j].porciento_demanda_total);
                  listEA[j]=entregaAcum;
              };
              programaEntrega[i].setEntregaAcumulada(listEA);
          };

          /****Aqui cargo el programa de lanzamiento****/
          var programaLanzamiento =[];

          for(var i=0; i<this.data.length; i++){
              programaLanzamiento[i] = mb.instance('ProgramaLanzamiento');
              programaLanzamiento[i].setAtributosDemanda(this.data[i].no_intervalo,this.data[i].demanda_final);
              if(i!=0){
                  programaLanzamiento[i].calcularDemandaAcumulada(programaLanzamiento[i-1].demanda_acumulada);
              }else{
                  programaLanzamiento[i].calcularDemandaAcumulada(0);
              };
              programaLanzamiento[i].setProcesos(procesos);
          };


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
              programaLanzamiento[i].setLanzamientoAcumulado(listLA);
          };

          /****Aqui cargo el Programa de Lanzamiento Ajustado****/
          var programaLanzamientoAjustado =[];

          for(var i=0; i<this.data.length; i++){
              programaLanzamientoAjustado[i] = mb.instance('ProgramaLanzamiento');
              programaLanzamientoAjustado[i].setAtributosDemanda(this.data[i].no_intervalo,this.data[i].demanda_agrupada);
              if(i!=0){
                  programaLanzamientoAjustado[i].calcularDemandaAcumulada(programaLanzamientoAjustado[i-1].demanda_acumulada);
              }else{
                  programaLanzamientoAjustado[i].calcularDemandaAcumulada(0);
              };
              programaLanzamientoAjustado[i].setProcesos(procesos);
          };



          for(var i=0; i<programaLanzamientoAjustado.length; i++){
              var listLA=[];
              for(var j=0; j<programaLanzamientoAjustado[i].procesos.length; j++){
                  var demAc;
                  var ni;
                  ni = programaLanzamientoAjustado[i].buscarNI(programaLanzamientoAjustado[i].procesos[j].it_lanzamiento);
                  var enco=false;
                  for(var m=0; m<programaLanzamientoAjustado.length && !enco; m++){
                      if(programaLanzamientoAjustado[m].no_intervalo == ni){
                          demAc = programaLanzamientoAjustado[m].demanda_acumulada;
                          enco = true;
                      }else {
                          demAc=0;
                      };
                  };
                  var lanAcum = programaLanzamientoAjustado[i].calcularLanzAcumulado(demAc,programaLanzamientoAjustado[i].procesos[j].indice_actividad,programaLanzamientoAjustado[i].procesos[j].porciento_demanda_total);
                  listLA[j]=lanAcum;
              };
              programaLanzamientoAjustado[i].setLanzamientoAcumulado(listLA);
          };

          /***Cargar Inventario***/

          var inventario =[];

          for(var i=0; i<this.data.length; i++){
              inventario[i] = mb.instance('Inventario');
              inventario[i].setIntervalo(this.data[i].no_intervalo);
              inventario[i].setProcesos(procesos);
          };



          for(var i=0; i<inventario.length; i++){
              var inv=[];
              for(var j=0; j<inventario[i].procesos.length; j++){
                  var invent = inventario[i].calcularInventario(programaLanzamiento[i].lanzamiento_acumulado[j],programaEntrega[i].entrega_acumulado[j]);
                  inv[j]=invent;
              };
              inventario[i].setInventario(inv);
          };

          /***Cargar Inventario Ajustado***/
          var inventarioAjustado =[];

          for(var i=0; i<this.data.length; i++){
              inventarioAjustado[i] = mb.instance('InventarioAjustado');
              inventarioAjustado[i].setIntervalo(this.data[i].no_intervalo);
              inventarioAjustado[i].setProcesos(procesos);
          };

          for(var i=0; i<inventarioAjustado.length; i++){
              var inv=[];
              for(var j=0; j<inventarioAjustado[i].procesos.length; j++){
                  var invent = inventarioAjustado[i].calcularInventarioAjustado(inventario[i].inventario[j],programaLanzamiento[i].lanzamiento_acumulado[j],programaLanzamientoAjustado[i].lanzamiento_acumulado[j]);
                  inv[j]=invent;
              };
              inventarioAjustado[i].setInventario(inv);
          };


          /***Aqui calculo la demanda final total***/
          var demandaFinalTotal = 0;

          for(var i=0; i<this.data.length; i++){
              demandaFinalTotal += parseInt(this.data[i].demanda_final);
          }
          this.demFT = demandaFinalTotal;

          /***Aqui calculo la demanda agrupada total***/
          var demandaAgrupadaTotal = 0;

          for(var i=0; i<this.data.length; i++){
              demandaAgrupadaTotal += parseInt(this.data[i].demanda_agrupada);
          }
          this.demAT = demandaAgrupadaTotal;

          /***Aqui calculo el total de inventario en cada proceso***/
          var listaTotalInventario = [];
          var totalInventario = 0;

          for(var i=0; i<procesos.length; i++){
              totalInventario = 0
              for(var j=0; j<inventario.length; j++){
                  totalInventario += inventario[j].inventario[i];
              }
              listaTotalInventario[i] = totalInventario;
              this.invT[i] = totalInventario;
          }

          /***Aqui calculo el total de inventario en cada proceso***/
          var listaTotalInventarioAjustado = [];
          var totalInventarioAjustado = 0;

          for(var i=0; i<procesos.length; i++){
              totalInventarioAjustado = 0
              for(var j=0; j<inventarioAjustado.length; j++){
                  totalInventarioAjustado += inventarioAjustado[j].inventario_ajustado[i];
              }
              listaTotalInventarioAjustado[i] = totalInventarioAjustado;
          }

          /***Aqui cargo el costo***/
          var costos =[];

          for(var i=0; i<procesos.length; i++){
              costos[i] = mb.instance('Costo');
              costos[i].setNumero(i);
              costos[i].setProceso(procesos[i]);
              costos[i].calcularCostoGestionBase(demandaFinalTotal,procesos[i].costo_gestion);
              costos[i].calcularCostoGestionAjustada(demandaAgrupadaTotal,procesos[i].costo_gestion);
              costos[i].calcularCostoInventarioBase(listaTotalInventario[i],procesos[i].costo_inventario);
              costos[i].calcularCostoInventarioAjustado(listaTotalInventarioAjustado[i],procesos[i].costo_inventario);
              // // if(i!=0){
              // //     inventario[i].calcularDemandaAcumulada(inventario[i-1].demanda_acumulada);
              // // }else{
              // //     inventario[i].calcularDemandaAcumulada(0);
              // // };

              //
              costos[i].calcularCostosTotales();
          }

          // for(var i=0; i<costos.length; i++){
          //     var inv=[];
          //     for(var j=0; j<this.data.length; j++){
          //         // var demAc;
          //         // // var ni;
          //         // ni = inventarioAjustado[i].buscarNI(costo[i].procesos[j].it_lanzamiento);
          //         // var enco=false;
          //         // for(var m=0; m<inventario.length && !enco; m++){
          //         //     if(inventario[m].no_intervalo == ni){
          //         //         demAc = inventario[m].demanda_acumulada;
          //         //         enco = true;
          //         //     }else {
          //         //         demAc=0;
          //         //     };
          //         // };
          //         var costo = costo[i].calcularCostosTotales(data[i].demanda_final,procesos[i].costo_gestion);
          //         inv[j]=invent;
              // };
              // this.prueba[i]=inv;
              // costo[i].setInventario(inv);
          // };

        this.data = costos;   
        this.loading = false;

      } catch (error) {
        utils.process_error(error);
        this.loading = false;
      }
    
    },


    // onEditing(model) {
    //   this.selected_model = mb.instance('Producto',model);
    //   this.showModalForm();
    // }
  },

  mounted() {
    this.loading = true;
    // this.data = [];
    this.load_data();
    // this.self = this;
    // this.pagination.$options.props = {
    //   load_data: this.load_data
    // };
  }
};
</script>

<style>
@import "costo_list.css";
</style>

