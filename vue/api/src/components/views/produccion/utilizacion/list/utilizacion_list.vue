<template>
  <div>
<div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h5 class="text-dark font-weight-bold my-1 mr-5"> Utilización de las capacidades de cada proceso (en %)</h5>
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
                <!--<a href="" class="text-muted">Utilización de las capacidades de cada proceso</a>-->
              <!--</li>-->
            <!--</ul>-->
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div>
        <!--<p>La funcion devuelve: {{probarFuncion}}</p>-->
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
            <h6 style="text-align: left">Listado de utilización de las capacidades de cada proceso</h6>
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


      <div class="mx-5 mt-5 pt-5 card card-custom shadow" v-if="mostar_grafico">
          <h4 class="card-title text-center my-3">Perfiles de Utilización de la  Capacidad de los procesos de la red (en %)</h4>
          <div class="card-body" id="grafico-div">
              <div v-for="(item,index) in grafico" class="my-5">
                  <h5 class="mb-4">{{ listaProcesos[index] }}</h5>
                  <column-chart :data="item"></column-chart>
                  <hr>
              </div>
          </div>
      </div>

    </div>
</template>



<script>

import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models/index";
import action_buttons from "../../../../shared/table/action_buttons/action_buttons";
import pagination_functions from "../../../../shared/table/pagination/pagination_options";
import vantdpagination from "../../../../shared/table/pagination/antd_pagination";
import { eventBus  } from "../../../../../main";

export default {
  name: "utilizacion",
    provide: function(){
      return{
        close_modal: this.onCloseModal,
        load_data: this.load_data
      }
    },
  data() {
    return {
      grafico:[],
      mostar_grafico:false,
      data: [],
      self: null,
      control_list: [],
      filter: null,
      listaProcesos:[],
      columns: mb.statics('Utilizacion').columns,
      loading: false,
      text_select: "Select All",
      selectedRowKeys: [],
      pagination: vantdpagination,
      selected_model: mb.instance( 'Utilizacion'),
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

  watch: {
    filter: function() {
      this.data = this.demanda_list.data.filter(this.filter_data);
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
  //   exportToExcel () {
  //     utils.exportToExcelVinstance(this)
  //   },
  //   exportToCSV () {
  //     utils.exportToCSV(this)
  //   },
  //   onCloseModal(e,reload_data=false) {
  //     this.selected_model = mb.instance('Demanda');
  //     this.show_modal_form = false;
  //     reload_data?this.load_data():''
  //   },
  //   showModalForm() {
  //     this.show_modal_form = !this.show_modal_form;
  //   },
    filter_data(object) {
      return utils.filter_object_column(object, this.filter,this.columns);
    },
    round(num, decimales = 2) {
      var signo = (num >= 0 ? 1 : -1);
      num = num * signo;
      if (decimales === 0) //con 0 decimales
          return signo * Math.round(num);
      // round(x * 10 ^ decimales)
      num = num.toString().split('e');
      num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
      // x * 10 ^ (-decimales)
      num = num.toString().split('e');
      return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
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
        this.id_scm_selected = eventBus.idScmSelected;

          /****Aqui cargo la demanda****/
          var params = {"attr": {"id_scm": + this.id_scm_selected}};
          params.relations=['scm'];
          const resp = await mb.statics('Demanda').list(params);
          var demanda = resp.data.filter(this.filter_data);

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

          for(var i=0; i<demanda.length; i++){
              programaEntrega[i] = mb.instance('ProgramaEntrega');
              programaEntrega[i].setAtributosDemanda(demanda[i].no_intervalo,demanda[i].demanda_final);
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
              // this.prueba[i]=listEA;
              programaEntrega[i].setEntregaAcumulada(listEA);
          };

          /***Aqui cargo el programa de produccion***/
          var programaProduccion = [];

          for(var i=0; i<demanda.length; i++){
              programaProduccion[i] = mb.instance('ProgramaProduccion');
              programaProduccion[i].setAtributosDemanda(demanda[i].no_intervalo,demanda[i].demanda_final);
              if(i!=0){
                  programaProduccion[i].calcularDemandaAcumulada(programaProduccion[i-1].demanda_acumulada);
              }else{
                  programaProduccion[i].calcularDemandaAcumulada(0);
              };
              programaProduccion[i].setProcesos(procesos);
          };

          for(var i=0; i<programaProduccion.length; i++){
              var listEA=[];
              for(var j=0; j<programaProduccion[i].procesos.length;j++){
                  if(i+1 == programaProduccion.length || programaEntrega[i+1].entrega_acumulado[j]== 0 ){
                      listEA[j]=0;
                  }else{
                      var tem = programaEntrega[i+1].entrega_acumulado[j]-programaEntrega[i].entrega_acumulado[j];
                      listEA[j] = this.round(tem,2);
                      // listEA[j]=1;
                  }
              }
              programaProduccion[i].setEntrgasAcumuladas(listEA);
          }

          /***Aqui cargo la utilizacion***/

          var utilizacion =[];

          for(var i=0; i<demanda.length; i++){
              utilizacion[i] = mb.instance('Utilizacion');
              utilizacion[i].setAtributosDemanda(demanda[i].no_intervalo,demanda[i].demanda_final);
              if(i!=0){
                  utilizacion[i].calcularDemandaAcumulada(utilizacion[i-1].demanda_acumulada);
              }else{
                  utilizacion[i].calcularDemandaAcumulada(0);
              };
              utilizacion[i].setProcesos(procesos);
          };

          for(var i=0; i<utilizacion.length; i++){
              var listUtil=[];
              for(var j=0; j<utilizacion[i].procesos.length;j++){
                  if(i+1 == utilizacion.length || programaProduccion[i+1].entregas_acumuladas[j]== 0 ){
                      listUtil[j] = 0;
                  }else{
                      var tem = programaProduccion[i].entregas_acumuladas[j] * 100/ programaProduccion[i].procesos[j].capacidad
                      listUtil[j] = this.round(tem,2);
                  }
              }
              utilizacion[i].setListaUtilizacion(listUtil);
          }

        this.data = utilizacion;
        this.columns = mb.statics('Utilizacion').crearColumnas(this.listaProcesos);
        this.grafico = this.pintar_grafico(this.data);
        if(this.grafico.length != 0){
            this.mostar_grafico = true;
        }
        this.loading = false;
      } catch (error) {
        utils.process_error(error);
        this.loading = false;
      }
    },


    // onEditing(model) {
    //   this.selected_model = mb.instance('Demanda',model);
    //   this.showModalForm();
    // }

      pintar_grafico(inv){
          console.log("datos pal grafico: ");
          if(this.data!=null){
              var utilizacion=[];
              var intervalo;
              var valor_utilizacion;
              var list_utiliz_proc=[];
              var list_final=[];
              for(var i=0; i<this.listaProcesos.length;i++){
                  for(var j=0; j<inv.length; j++){
                      intervalo = j+1;
                      valor_utilizacion = inv[j].utilizacion_list[i]
                      utilizacion.push(intervalo)
                      utilizacion.push(valor_utilizacion)
                      list_utiliz_proc.push(utilizacion);
                      utilizacion=[];
                  }
                  list_final.push(list_utiliz_proc);
                  list_utiliz_proc=[];
              }
              console.log(list_final);
              return list_final;
          }
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
@import "utilizacion_list.css";
</style>

