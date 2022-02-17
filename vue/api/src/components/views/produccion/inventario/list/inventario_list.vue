<template>
  <div>
    <div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
      <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">
          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h5 class="text-dark font-weight-bold my-1 mr-5">Inventario</h5>
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
            <!--<a href="" class="text-muted">Inventario</a>-->
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
          <!--        <div class="col-md-6" style="text-align: end;">-->
          <!--          <div class="form-group">-->
          <!--            <div class="input-group mb-3">-->
          <!--              <a-tooltip placement="topLeft" title="Buscar..">-->
          <!--                <input-->
          <!--                  type="text"-->
          <!--                  class="form-control form-control-sm"-->
          <!--                  v-model="filter"-->
          <!--                  placeholder="Buscar"-->
          <!--                  aria-label-->
          <!--                />-->
          <!--              </a-tooltip>-->
          <!--              <div class="input-group-append">-->
          <!--                <a-tooltip placement="topLeft" title="Limpiar Filtros">-->
          <!--                  <a-button-->
          <!--                    style="text-align: end"-->
          <!--                    class="rounded-0"-->
          <!--                    type="primary"-->
          <!--                    @click="filter=''"-->
          <!--                  >-->
          <!--                    <i class="fa fa-eraser" style="margin-right: 10px" />Limpiar-->
          <!--                  </a-button>-->
          <!--                </a-tooltip>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </div>
    </div>
    <div>
      <div class="card card-custom">
        <div class="card-header py-3">
          <div class="col-md-6">
            <h6 style="text-align: left">Listado del inventario</h6>
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
        <action_buttons :object="record" :visible_view="false" :v_instance="self"
                        :class_name="selected_model.class_name()"/>
      </a>
    </a-table>


    <div class="d-flex justify-content-center my-5">
      <div class="card card-custom shadow">
        <div>    <!--Este div es el de arriba sin la clase card-->
          <div class="d-flex flex-wrap mt-5">
            <div class="row">
              <div class="col">
                <div class="m-2 ">
                  <h5 class="card-title text-center my-3">Inventarios Totales</h5>
                  <!--<hr width="50%" class="align-self-center my-0">-->
                  <div class="card-body d-flex flex-column">
                    <ul class="d-flex flex-row flex-wrap" id="lista_inventarios">

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-5 mt-5 pt-5 card card-custom shadow" v-if="mostar_grafico">
      <h4 class="card-title text-center my-3">Inventario base de cada proceso en cada intervalo</h4>
      <div class="card-body">
        <line-chart :data="grafico"></line-chart>
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
import {eventBus} from "../../../../../main";


export default {
  name: "inventario_list",
  provide: function () {
    return {
      close_modal: this.onCloseModal,
      load_data: this.load_data
    }
  },
  data() {
    return {
      grafico: '',
      mostar_grafico: false,
      data: [],
      self: null,
      control_list: [],
      filter: null,
      columns: mb.statics('Inventario').columns,
      loading: false,
      text_select: "Select All",
      selectedRowKeys: [],
      pagination: vantdpagination,
      selected_model: mb.instance('Inventario'),
      show_modal_form: false,
      mb,
      listaProcesos: [],
      prueba: [],
      list_inventarios_total: [],
    };
  },

  components: {
    action_buttons,
    pagination_functions,
    vantdpagination,
  },

  watch: {
    filter: function () {
      this.data = this.demanda_list.data.filter(this.filter_data);
    },
    selectedRowKeys: function () {
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
      return utils.filter_object_column(object, this.filter, this.columns);
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
    //   onChange: function(selectedRowKeys) {
    //     this.selectedRowKeys = selectedRowKeys;
    //   },
    //   showDeleteConfirm() {
    //     if (this.selectedRowKeys.length == 0) {
    //       utils.openNotificationWithIcon(
    //         "error",
    //         "Eliminar elementos seleccionados",
    //         "Debe seleccionar al menos u elemento"
    //       );
    //       return;
    //     }
    //     let _this = this;
    //     this.$confirm({
    //       title: "Eliminar elementos seleccionados?",
    //       icon: "delete",
    //       // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
    //       okText: "Si",
    //       okType: "danger",
    //       class: "delete_confirm",
    //       cancelText: "No",
    //       async onOk() {
    //         try {
    //           const response = await mb.statics('Demanda').delete_by_ids(
    //               _this.selectedRowKeys
    //             );
    //              utils.process_response(response, "deleted");
    //             _this.selectedRowKeys=[];
    //             _this.load_data();
    //           } catch (error) {
    //             utils.process_error(error);
    //             _this.selectedRowKeys=[];
    //           }
    //       },
    //       onCancel() {}
    //     });
    //   },
    async load_data() {
      try {
        this.loading = true;
        this.id_scm_selected = eventBus.idScmSelected;

        /****Aqui cargo la demanda****/
        var params = {"attr": {"id_scm": +this.id_scm_selected}};
        params.relations = ['scm'];
        const resp = await mb.statics('Demanda').list(params);
        this.data = resp.data.filter(this.filter_data);

        /****Aqui cargo los procesos****/
        var params2 = {"attr": {"id_scm": +this.id_scm_selected}};
        params2.relations = ['entidad', 'producto', 'scm', 'tipo_proceso', 'unidad_medida'];
        var resp2 = await mb.statics('Proceso').list(params2);
        var procesosServ = resp2.data.filter(this.filter_data);
        var procesos = [];
        for (var i = 0; i < procesosServ.length; i++) {
          procesos[i] = mb.instance('Proceso', procesosServ[i]);

          /****Aqui cargo la interrelacion del proceso****/
          params2 = {"attr": {"id_proceso": procesos[i].id_proceso}};
          params2.relations = ['proceso'];
          var par = await mb.statics('Interrelacion').list(params2);
          var interrelacionServ = par.data.filter(this.filter_data);
          var interrelacion = mb.instance('Interrelacion', interrelacionServ[0]);

          /****Aqui calculo el indice de Actividad del proceso****/
          procesos[i].calcularIndiceActividad(interrelacion.general);
          this.listaProcesos[i] = procesos[i];
        }

        //////////////////Calculo del programa de entrega///////////////////////////
        var programaEntrega = [];

        for (var i = 0; i < this.data.length; i++) {
          programaEntrega[i] = mb.instance('ProgramaEntrega');
          programaEntrega[i].setAtributosDemanda(this.data[i].no_intervalo, this.data[i].demanda_final);
          if (i != 0) {
            programaEntrega[i].calcularDemandaAcumulada(programaEntrega[i - 1].demanda_acumulada);
          } else {
            programaEntrega[i].calcularDemandaAcumulada(0);
          }
          ;
          programaEntrega[i].setProcesos(procesos);
        }
        ;


        for (var i = 0; i < programaEntrega.length; i++) {
          var listEA = [];
          for (var j = 0; j < programaEntrega[i].procesos.length; j++) {
            var demAc;
            var ni;
            ni = programaEntrega[i].buscarNI(programaEntrega[i].procesos[j].lt_entrega);
            var enco = false;
            for (var m = 0; m < programaEntrega.length && !enco; m++) {
              if (programaEntrega[m].no_intervalo == ni) {
                demAc = programaEntrega[m].demanda_acumulada;
                enco = true;
              } else {
                demAc = 0;
              }
              ;
            }
            ;
            var entregaAcum = programaEntrega[i].calcularEntregaAcumulada(demAc, programaEntrega[i].procesos[j].indice_actividad, programaEntrega[i].procesos[j].porciento_demanda_total);
            listEA[j] = entregaAcum;
          }
          ;
          // this.prueba[i]=listEA;
          programaEntrega[i].setEntregaAcumulada(listEA);
        }
        ;

        ///////////////////////Calculo del programa de lanzamiento///////////////////////////
        var programaLanzamiento = [];

        for (var i = 0; i < this.data.length; i++) {
          programaLanzamiento[i] = mb.instance('ProgramaLanzamiento');
          programaLanzamiento[i].setAtributosDemanda(this.data[i].no_intervalo, this.data[i].demanda_final);
          if (i != 0) {
            programaLanzamiento[i].calcularDemandaAcumulada(programaLanzamiento[i - 1].demanda_acumulada);
          } else {
            programaLanzamiento[i].calcularDemandaAcumulada(0);
          }
          ;
          programaLanzamiento[i].setProcesos(procesos);
        }
        ;


        for (var i = 0; i < programaLanzamiento.length; i++) {
          var listLA = [];
          for (var j = 0; j < programaLanzamiento[i].procesos.length; j++) {
            var demAc;
            var ni;
            ni = programaLanzamiento[i].buscarNI(programaLanzamiento[i].procesos[j].it_lanzamiento);
            var enco = false;
            for (var m = 0; m < programaLanzamiento.length && !enco; m++) {
              if (programaLanzamiento[m].no_intervalo == ni) {
                demAc = programaLanzamiento[m].demanda_acumulada;
                enco = true;
              } else {
                demAc = 0;
              }
              ;
            }
            ;
            var lanAcum = programaLanzamiento[i].calcularLanzAcumulado(demAc, programaLanzamiento[i].procesos[j].indice_actividad, programaLanzamiento[i].procesos[j].porciento_demanda_total);
            listLA[j] = lanAcum;
          }
          ;
          this.prueba[i] = listLA;
          programaLanzamiento[i].setLanzamientoAcumulado(listLA);
        }
        ;

        /***Cargar Inventario***/

        var inventario = [];

        for (var i = 0; i < this.data.length; i++) {
          inventario[i] = mb.instance('Inventario');
          inventario[i].setIntervalo(this.data[i].no_intervalo);
          // if(i!=0){
          //     inventario[i].calcularDemandaAcumulada(inventario[i-1].demanda_acumulada);
          // }else{
          //     inventario[i].calcularDemandaAcumulada(0);
          // };
          inventario[i].setProcesos(procesos);
        }
        ;


        for (var i = 0; i < inventario.length; i++) {
          var inv = [];
          for (var j = 0; j < inventario[i].procesos.length; j++) {
            // var demAc;
            // var ni;
            // ni = inventario[i].buscarNI(inventario[i].procesos[j].it_lanzamiento);
            // var enco=false;
            // for(var m=0; m<inventario.length && !enco; m++){
            //     if(inventario[m].no_intervalo == ni){
            //         demAc = inventario[m].demanda_acumulada;
            //         enco = true;
            //     }else {
            //         demAc=0;
            //     };
            // };
            var invent = inventario[i].calcularInventario(programaLanzamiento[i].lanzamiento_acumulado[j], programaEntrega[i].entrega_acumulado[j]);
            inv[j] = invent;
          }
          ;
          // this.prueba[i]=inv;
          inventario[i].setInventario(inv);
        }
        ;

        /***Calcular los inventarios totales en los procesos***/
        if (inventario[0] != null) {
          for (var i = 0; i < inventario[0].procesos.length; i++) {
            var sumInventarios = 0;
            for (var j = 0; j < inventario.length; j++) {
              sumInventarios += inventario[j].inventario[i]
            }
            this.list_inventarios_total[i] = this.round(sumInventarios, 2);
          }
        }

        /***Imprimir lista de inventarios totales***/
        const lista_inventario = document.querySelector('#lista_inventarios');
        const fragment = document.createDocumentFragment();
        if (this.list_inventarios_total.length != 0) {
          for (var i = 0; i < this.list_inventarios_total.length; i++) {
            const div = document.createElement('div');
            const li = document.createElement('li');
            li.classList.add("mx-5");
            const p = document.createElement('p');
            p.textContent = inventario[0].procesos[i].nombre + ": " + this.list_inventarios_total[i];
            li.appendChild(p);
            div.appendChild(li)
            fragment.appendChild(div);
          }
          lista_inventario.appendChild(fragment);
        } else {
          const p = document.createElement('p');
          p.textContent = "No hay elementos en el inventario";
          fragment.appendChild(p);
          lista_inventario.appendChild(fragment);
        }


        this.data = inventario;
        // console.log(this.data);
        //   console.log(this.listaProcesos);
        this.columns = mb.statics('Inventario').crearColumnas(this.listaProcesos);
        this.grafico = this.pintar_grafico(this.data);
        if (this.grafico.length != 0) {
          this.mostar_grafico = true;
        }
        this.loading = false;
      } catch (error) {
        utils.process_error(error);
        this.loading = false;
      }
    },
    //
    //
    //   onEditing(model) {
    //     this.selected_model = mb.instance('Demanda',model);
    //     this.showModalForm();
    //   }
    pintar_grafico(inv) {
      console.log("datos pal grafico: ");
      /***Calcular los inventarios totales en los procesos***/
      if (this.data != null) {
        var list_inventario = [];
        var intervalo;
        var inventario;
        var titulo;
        var obj_graf;
        var t1 = 'name';
        var t2 = 'data';
        // console.log(this.listaProcesos);
        // console.log(inv);
        for (var i = 0; i < this.listaProcesos.length; i++) {
          inventario = new Object();
          for (var j = 0; j < inv.length; j++) {
            intervalo = j + 1;
            inventario[intervalo] = inv[j].inventario[i];
          }
          titulo = this.listaProcesos[i].nombre;
          obj_graf = new Object();
          obj_graf[t1] = titulo;
          obj_graf[t2] = inventario;
          list_inventario.push(obj_graf);
        }
        console.log(list_inventario);
        return list_inventario;
      }
      // var data = [
      //     {data: {'2017-01-01': 3, '2017-01-02': 4}},
      //     {data: {'2017-01-01': 5, '2017-01-02': 3}}
      // ];

    }
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
@import "inventario_list.css";
</style>

