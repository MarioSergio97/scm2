<template>
    <div>

        <div class="subheader py-2 py-lg-6 subheader-solid" id="kt_subheader">
        <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!-- &lt;!&ndash;begin::Info&ndash;&gt; -->

        <div class="d-flex align-items-center flex-wrap mr-1">
        <!--&lt;!&ndash;begin::Page Heading&ndash;&gt;-->
        <div class="d-flex align-items-baseline flex-wrap mr-5">
        <!--&lt;!&ndash;begin::Page Title&ndash;&gt;-->
        <h5 class="text-dark font-weight-bold my-1 mr-5">Scm</h5>
        <!--&lt;!&ndash;end::Page Title&ndash;&gt;-->
        <!--&lt;!&ndash;begin::Breadcrumb&ndash;&gt;-->
        <!--<ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">-->
        <!--<li class="breadcrumb-item">-->
        <!--<a href="/" class="text-muted">Inicio</a>-->
        <!--</li>-->
        <!--&lt;!&ndash; <li class="breadcrumb-item"> &ndash;&gt;-->
        <!--&lt;!&ndash; <a href="/" class="text-muted">Gestion</a> &ndash;&gt;-->
        <!--&lt;!&ndash; </li> &ndash;&gt;-->
        <!--<li class="breadcrumb-item">-->
        <!--<a href="" class="text-muted">Scm</a>-->
        <!--</li>-->
        <!--</ul>-->
        </div>
        </div>
        </div>
        </div>

        <div class="container">
            <div>
                <!--<p>id de la scm = {{ id_scm_selected  }}</p>-->
                <!--<p>id de la scm = {{ scm_selected  }}</p>-->
                <!--<p>id de la entidad gestora = {{idGestora}}</p>-->
                <!--<p>El usuario es admin? = {{esAdmin}}</p>-->
                <div class="row">
                    <div class="col-md-6">
                        <!--<a-button-group style="margin-bottom: 10px">-->
                            <!--<a-tooltip placement="topLeft" title="Acceder a la SCM seleccionada">-->
                                <!--<a-button icon="plus" type="primary" @click="selectSCM_action">Entrar</a-button>-->
                            <!--</a-tooltip>-->
                            <!--<a-tooltip placement="topLeft" title="Añadir nuevo elemento" v-if="esAdmin">-->
                                <!--<a-button icon="plus" type="primary" @click="showModalForm">Añadir</a-button>-->
                            <!--</a-tooltip>-->
                            <!--&lt;!&ndash;<a-tooltip placement="topLeft" title="Eliminar elementos seleccionados">&ndash;&gt;-->
                            <!--&lt;!&ndash;<a-button icon="delete" type="danger" @click="showDeleteConfirm">Eliminar</a-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;</a-tooltip>&ndash;&gt;-->
                        <!--</a-button-group>-->
                    </div>
                    <div class="col-md-6" style="text-align: end;">
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
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="card card-custom">
            <!--<div class="card-header py-3">-->
            <div>    <!--Este div es el de arriba sin la clase card-->
            <!--<h6 style="text-align: left">Listado de Scm</h6>-->
                <h4 style="text-align: center">Planificación y Control de una red logística</h4>
                <h4 class="text-center">Producto analizado: {{nombre_scm}}</h4>
                <hr width="50%">
                <div class="d-flex flex-wrap mt-5">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card m-2 shadow">
                              <h5 class="card-title text-center my-3"><strong>Intervalo número del control</strong></h5>
                                <!--<hr width="50%" class="align-self-center my-0">-->
                                <div class="card-body d-flex flex-column">
                                    <p>El intervalo número de control es: {{intervalo_numero_control}}</p>
                                    <p>La fecha en el intervalo de control es: {{fecha_demanda_intervalo}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card m-2 shadow">
                              <h5 class="card-title text-center my-3"><strong>Norma del inventario</strong></h5>
                                <div class="card-body d-flex flex-column">
                                    <p>La norma en el intervalo total de la cadena es: {{norma_inventario_total_cadena}}</p>
                                    <p>Inventario total en la SCM en UM del proceso: {{inventario_total_um}}</p>
                                    <p>Inventario total en la SCM en producto final: {{inventario_total_final}}</p>
                                    <p>Cumplimiento de la norma inventario: {{cumplimiento_norma_inventario}} %</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <div class="card m-2 shadow">
                                <h5 class="card-title text-center my-3"><strong>Resumen del estado de ejecución</strong></h5>
                                <div class="card-body d-flex flex-column">
                                    <h5><em>Procesos en lanzamiento</em></h5>
                                    <p>La cantidad de procesos en lazamiento con atraso son: {{procesos_lanzamientos_atrasado}}</p>
                                    <p>La cantidad de procesos en lazamiento en tiempo son: {{procesos_lanzamientos_tiempo}}</p>
                                    <p>La cantidad de procesos en lazamiento con adelanto son: {{procesos_lanzamientos_adelantado}}</p>
                                    <h5><em>Procesos en entrega</em></h5>
                                    <p>La cantidad de procesos en entrega con atrasos son: {{procesos_entrega_atrasado}}</p>
                                    <p>La cantidad de procesos en entrega en tiempo son: {{procesos_entrega_tiempo}}</p>
                                    <p>La cantidad de procesos en entrega con adelanto son: {{procesos_entrega_adelantado}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4 margen">
                            <div class="card m-2 shadow">
                                <h5 class="card-title text-center my-3"></h5>
                                <div class="card-body d-flex flex-column">
                                    <p>Horizonte de planificación mínimo: {{horizonte_planificacion_minimo}}</p>
                                    <p>El precio al cliente final es: {{precio_cliente_final}}</p>
                                </div>
                            </div>
                        </div>


                        <!--<p>{{probar_servicios}}</p>-->
                    </div>
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
                    <!--:title="selected_model.get_id()?'Actualizar scm':'Añadir scm'"-->
                    <!--class="modal-form"-->
                    <!--width="55rem"-->
                    <!--:visible="show_modal_form"-->
                    <!--:destroyOnClose="true"-->
                    <!--on-ok="handleOk"-->
                    <!--:header="null"-->
                    <!--:footer="null"-->
                    <!--:maskClosable="false"-->

            <!--&gt;-->
                <!--<scm_form  :modal=true :model="selected_model" />-->
            <!--</a-modal>-->

            <!--<a-table-->
                    <!--:columns="columns"-->
                    <!--:rowKey="record => record.id_scm"-->
                    <!--:dataSource="data"-->
                    <!--:rowSelection="rowSelection"-->
                    <!--:loading="loading"-->
                    <!--:pagination="pagination.$data"-->
                    <!--:scroll="{ x: '240%', y: 240 }"-->
            <!--&gt;-->
                <!--<a slot="action" slot-scope="record" href="javascript:;">-->
                    <!--<action_buttons :object="record" :visible_view="false" :v_instance="self" :class_name="selected_model.class_name()"/>-->
                <!--</a>-->

            <!--</a-table>-->
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
        name: "scm_list",
        provide: function(){
            return{
                close_modal: this.onCloseModal,
                load_data: this.load_data
            }
        },
        data() {
            return {
                datP: this.llenar_objeto(),
                data: [],
                self: null,
                scm_list: [],
                filter: null,
                columns: mb.statics('Scm').columns,
                loading: false,
                text_select: "Select All",
                selectedRowKeys: [],
                pagination: vantdpagination,
                selected_model: mb.instance( 'Scm'),
                show_modal_form: false,
                mb,
                id_scm_selected: '1',
                scm_selected:false,
                idGestora: '99',
                esAdmin:false,
                cumplimiento: 0,
                //////////nuevos datos MS//////////
                id_scm_prueba:0,
                nombre_scm:'',
                intervalo_numero_control:0,
                norma_inventario_total_cadena:0,
                fecha_demanda_intervalo:'',
                probar_servicios:[],
                inventario_total_um:0,
                inventario_total_final:0,
                cumplimiento_norma_inventario:0,
                /*Variables de resumen del estado de ejecución de la SCM-Inicio*/
                procesos_lanzamientos_atrasado:0,
                procesos_lanzamientos_tiempo:0,
                procesos_lanzamientos_adelantado:0,
                procesos_entrega_atrasado:0,
                procesos_entrega_tiempo:0,
                procesos_entrega_adelantado:0,
                /*Variables de resumen del estado de ejecución de la SCM-Fin*/
                horizonte_planificacion_minimo:0,
                precio_cliente_final:0

            };
        },


        inject: {
            scmSelect: { default: ()=>{} },
        },

        components: {
            action_buttons,
            pagination_functions,
            vantdpagination,
            // scm_form
        },

        watch: {
            filter: function() {
                this.data = this.scm_list.data.filter(this.filter_data);
            },
            // selectedRowKeys: function() {
            //   if (this.selectedRowKeys.length == this.data.length) {
            //     this.text_select = "Desseleccionar todo";
            //   } else {
            //     this.text_select = "Seleccionar todo";
            //   }
            // }
        },

        computed: {
            // rowSelection() {
            //
            //     const { selectedRowKeys } = this;
            //     return {
            //         type: 'radio',
            //         selectedRowKeys,
            //         hideDefaultSelections: true,
            //         selections: [
            //             {
            //                 key: "all-data",
            //                 text: this.text_select,
            //                 onSelect: () => {
            //                     if (this.selectedRowKeys.length == this.data.length) {
            //                         this.selectedRowKeys = [];
            //                     } else {
            //                         this.selectedRowKeys = this.data.map(e => {
            //                             return e.id_scm;
            //                         });
            //                     }
            //                 }
            //             }
            //         ],
            //         onSelection: this.onSelection,
            //         onChange: this.onChange,
            //     };
            // }
        },

        methods: {

            llenar_objeto(){
                // this.datP = {
                //     '2017-01-01': 3,
                //     '2017-01-02': 4
                // }

                var title1 = '2017-01-01';
                var title2 = '2017-01-15';
                var title3 = '2017-01-30';
                var obj = new Object();

                obj[title1] = 3;
                obj[title2] = 9;
                obj[title3] = 4;

                return obj;
            },

            // selectSCM_action(){
            //     if (this.selectedRowKeys.length == 0) {
            //         utils.openNotificationWithIcon(
            //             "error",
            //             "Entrar a la cadena de suministro.",
            //             "Debe seleccionar una cadena de suministro."
            //         );
            //         return;
            //     }
            //     else{
            //         this.scmSelect();
            //     }
            // },
            //
            // exportToExcel () {
            //     utils.exportToExcelVinstance(this)
            // },
            //
            // exportToCSV () {
            //     utils.exportToCSV(this)
            // },
            //
            // onCloseModal(e,reload_data=false) {
            //     this.selected_model = mb.instance('Scm');
            //     this.show_modal_form = false;
            //     reload_data?this.load_data():''
            // },
            //
            // showModalForm() {
            //     this.show_modal_form = !this.show_modal_form;
            // },

            filter_data(object) {
                return utils.filter_object_column(object, this.filter,this.columns);
            },

            // onChange: function(selectedRowKeys) {
            //     this.selectedRowKeys = selectedRowKeys;
            //     this.id_scm_selected = selectedRowKeys[0];
            //     // eventBus.cambiarSCM(this.id_scm_selected);
            //     eventBus.idScmSelected = this.id_scm_selected;
            //
            //
            //     if(this.id_scm_selected==null){
            //         this.scm_selected=false;
            //     }else{
            //         this.scm_selected=true;
            //     }
            //     eventBus.scmSelected = this.scm_selected;
            //
            // },
            //
            // showDeleteConfirm() {
            //     if (this.selectedRowKeys.length == 0) {
            //         utils.openNotificationWithIcon(
            //             "error",
            //             "Eliminar elementos seleccionados",
            //             "Debe seleccionar al menos un elemento"
            //         );
            //         return;
            //     }
            //     let _this = this;
            //     this.$confirm({
            //         title: "¿Eliminar elementos seleccionados?",
            //         icon: "delete",
            //         // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
            //         okText: "Si",
            //         okType: "danger",
            //         class: "delete_confirm",
            //         cancelText: "No",
            //         async onOk() {
            //             try {
            //                 const response = await mb.statics('Scm').delete_by_ids(
            //                     _this.selectedRowKeys
            //                 );
            //                 utils.process_response(response, "deleted");
            //                 _this.selectedRowKeys=[];
            //                 _this.load_data();
            //             } catch (error) {
            //                 utils.process_error(error);
            //                 _this.selectedRowKeys=[];
            //             }
            //         },
            //         onCancel() {}
            //     });
            // },

            async load_data() {
                try {
                    console.log("prueba 01")
                    this.id_scm_selected = eventBus.idScmSelected;
                    this.loading = true;
                    var params = {"attr": {"id_scm": + this.id_scm_selected}};
                    params.relations=['entidad_gestora'];

                    const resp = await mb.statics('Scm').list(params);
                    this.scm_list = resp;
                    this.data = this.scm_list.data.filter(this.filter_data);

                    ///Cargando Demanda///

                    var params = {"attr": {"id_scm": + this.id_scm_selected} };
                    params.relations=['scm'];

                    var demanda_list = await mb.statics('Demanda').list(params);
                    var demanda = demanda_list.data.filter(this.filter_data);

                    //Cargar Reporte///
                    var id_procesos_list = eventBus.listProces;

                    /***Aqui cargo el servicio de los reportes que pertenecen a los procesos de la SCM***/
                    var params = {"attr": {"id_proceso": id_procesos_list}};
                    params.relations=['proceso'];
                    var reporte_list = await mb.statics('Reporte').list(params);
                    var reporte = reporte_list.data.filter(this.filter_data);

                    /***Aqui creo el reporte de cada proceso***/
                    var reportes=[];
                    var inventarioTotalUM =0; ////Inventario total de la SCM(en UM del proceso), dentro del reporte
                    var inventarioTotalFinal =0; ////Inventario total de la SCM(en producto final), dentro del reporte

                    for(var i=0; i<reporte.length; i++){
                        reportes[i] = mb.instance('Reporte',reporte[i]);
                        params = {"attr": {"id_proceso": reportes[i].id_proceso} };
                        params.relations=['entidad','producto','scm','tipo_proceso'];
                        var par = await mb.statics('Proceso').list(params);
                        var procesoServ = par.data.filter(this.filter_data);
                        var proceso = mb.instance('Proceso',procesoServ[0]);

                        params = {"attr": {"id_proceso": proceso.id_proceso} };
                        params.relations=['proceso'];
                        par = await mb.statics('Interrelacion').list(params);
                        var interrelacionServ = par.data.filter(this.filter_data);
                        var interrelacion = mb.instance('Interrelacion',interrelacionServ[0]);

                        proceso.calcularIndiceActividad(interrelacion.general);

                        reportes[i].calcularIProcUM(proceso.indice_actividad);
                        reportes[i].calcularIProcFinal(proceso.indice_actividad);

                        inventarioTotalUM += reportes[i].inventario;
                        inventarioTotalFinal += reportes[i].inventario_final;
                    }

                    console.log("prueba 02")

                    this.inventario_total_um = inventarioTotalUM;
                    this.inventario_total_final = inventarioTotalFinal;

                    ///Hayar fecha en el intervalo de control de la demanda//
                    for(var i=0; i<demanda.length; i++){
                        if(demanda[i].no_intervalo == this.data[0].intervalo_numero_control){
                            this.fecha_demanda_intervalo = demanda[i].fecha;
                        }
                    }

                    console.log("prueba 03")
                    /*Cargar el comtrol del programa de lanzamiento-Inicio*/

                    /****Aqui cargo los procesos de la scm****/
                    var params = { "attr": { "id_proceso": eventBus.listProces} };
                    params.relations=['entidad','producto','scm','tipo_proceso'];
                    var respuesta = await mb.statics('Proceso').list(params);
                    var procesosServ = respuesta.data.filter(this.filter_data);
                    var procesos=[]

                    for(var i=0; i<procesosServ.length; i++){
                        procesos[i] = mb.instance('Proceso',procesosServ[i]);

                        /****Aqui cargo la interrelacion del proceso****/
                        params = {"attr": {"id_proceso": procesos[i].id_proceso} };
                        params.relations=['proceso'];
                        var respuesta = await mb.statics('Interrelacion').list(params);
                        var interrelacionServ = respuesta.data.filter(this.filter_data);
                        var interrelacion = mb.instance('Interrelacion',interrelacionServ[0]);

                        /****Aqui calculo el indice de Actividad del proceso****/
                        procesos[i].calcularIndiceActividad(interrelacion.general);
                    }

                    console.log("prueba 03.1")

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

                    console.log("prueba 03.2")

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

                    console.log("prueba 03.3")

                    /****Aqui creo el control del programa de lanzamiento****/
                    var controlLanzamiento=[];

                    for(var i=0; i<procesos.length; i++) {
                        controlLanzamiento[i] = mb.instance('Control');

                        /****Aqui creo el reporte del proceso****/
                        params = {"attr": {"id_proceso": procesos[i]}};
                        params.relations = ['proceso'];
                        var report = await mb.statics('Reporte').list(params);
                        var reportes = report.data.filter(this.filter_data);

                        controlLanzamiento[i].setProceso(procesos[i]);
                        controlLanzamiento[i].setEstadoFlujo(10);

                        var enc = false;
                        for (var j = 0; j < reportes.length && !enc; j++) {
                            if (controlLanzamiento[i].proceso.id_proceso == reportes[j].proceso.id_proceso) {
                                controlLanzamiento[i].setRealAcumulado(reportes[j].lanzamiento);
                                enc = true;
                            }
                        };

                        console.log("prueba 03.4")

                        /***Calcular Plan acumulado de lanzamiento***/

                        if(programaLanzamiento.length != 0){
                            if(programaLanzamiento[controlLanzamiento[i].estado_flujo-1] != null){
                                var encontrado = false;
                                for(var j=0; j<programaLanzamiento[controlLanzamiento[i].estado_flujo-1].procesos.length && !encontrado; j++){
                                    if(programaLanzamiento[controlLanzamiento[i].estado_flujo-1].procesos[j].id_proceso == controlLanzamiento[i].proceso.id_proceso){
                                        controlLanzamiento[i].plan_acumulado_lanzamiento = programaLanzamiento[controlLanzamiento[i].estado_flujo-1].lanzamiento_acumulado[j];
                                        encontrado = true;
                                    }else {
                                        controlLanzamiento[i].plan_acumulado_lanzamiento = '#N/A';
                                    }

                                };

                                console.log("prueba 03.5")

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
                                                controlLanzamiento[i].asegurado_hasta_intervalo = programaLanzamiento[j].no_intervalo;
                                            }else {
                                                enc3 = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                        console.log("prueba 03.6")
                        /*Cargar el comtrol del programa de lanzamiento-Fin*/

                        /*Calcular variables de resumen del estado de ejecución del programa de lanzamiento de la SCM*/

                        console.log('Tamanno de arreglo '+controlLanzamiento.length)
                        console.log(controlLanzamiento)
                        for(var j=0;j<controlLanzamiento.length;j++){
                            console.log('Entro al arreglo vez: '+j)
                            console.log("prueba 03.7")

                            if(controlLanzamiento[j].estado == 'ATRASADO'){this.procesos_lanzamientos_atrasado ++}
                            else if(controlLanzamiento[j].estado == 'ADELANTADO'){this.procesos_lanzamientos_adelantado ++}
                            else if(controlLanzamiento[j].estado == 'EN TIEMPO'){this.procesos_lanzamientos_tiempo ++}
                        }

                        console.log("prueba 04")


                    /*Cargar el comtrol del programa de entrega-Inicio*/

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

                    console.log("prueba 04.1")

                    /****Aqui creo el control del programa de entrega****/
                    var controlEntrega = [];

                    for(var i=0; i<procesos.length; i++) {
                        controlEntrega[i] = mb.instance('ControlEntrega');

                        /****Aqui creo el reporte del proceso****/
                        params = {"attr": {"id_proceso": procesos[i]}};
                        params.relations = ['proceso'];
                        var report = await mb.statics('Reporte').list(params);
                        var reportes = report.data.filter(this.filter_data);

                        controlEntrega[i].setProceso(procesos[i]);
                        controlEntrega[i].setEstadoFlujo(10);

                        var enc = false;
                        for (var j = 0; j < reportes.length && !enc; j++) {
                            if (controlEntrega[i].proceso.id_proceso == reportes[j].proceso.id_proceso) {
                                controlEntrega[i].setRealAcumulado(reportes[j].entregado);
                                enc = true;
                            }
                        }

                        console.log("prueba 04.2")
                        /***Calcular Plan acumulado de entrega***/
                        if(programaEntrega.length !=0 ){
                            if(programaEntrega[controlEntrega[i].estado_flujo-1] != null){
                                var encontrado = false;
                                for(var j=0; j<programaEntrega[controlEntrega[i].estado_flujo-1].procesos.length && !encontrado; j++){
                                    if(programaEntrega[controlEntrega[i].estado_flujo-1].procesos[j].id_proceso == controlEntrega[i].proceso.id_proceso){
                                        controlEntrega[i].plan_acumulado_entrega = programaEntrega[controlEntrega[i].estado_flujo-1].entrega_acumulado[j];
                                        encontrado = true;
                                    }else {
                                        controlEntrega[i].plan_acumulado_entrega = '#N/A';
                                    }

                                }

                                controlEntrega[i].calcularPorcientoCumplimiento();
                                controlEntrega[i].calcularDefici();
                                controlEntrega[i].determinarEstado();

                                console.log("prueba 04.3")
                                /***Determinar el intervalo hasta el cual esta asegurado***/

                                var enc3 = false;
                                for(var j=0; j<programaEntrega.length && !enc3; j++){
                                    var enc2=false;
                                    for(var m=0; m<programaEntrega[j].procesos.length && !enc2; m++){
                                        if(programaEntrega[j].procesos[m].id_proceso == controlEntrega[i].proceso.id_proceso){
                                            enc2 = true;
                                            if(programaEntrega[j].entrega_acumulado[m]<=controlEntrega[i].real_acumulado_entrega){
                                                controlEntrega[i].asegurado_hasta_intervalo = programaEntrega[j].no_intervalo;
                                            }else {
                                                enc3 = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                        console.log("prueba 04.4")
                        /*Calcular variables de resumen del estado de ejecución del programa de entrega de la SCM*/

                        for(var i=0;i<controlEntrega.length;i++){
                            console.log("posicion del for: "+i)
                            if(controlEntrega[i].estado == 'ATRASADO'){this.procesos_entrega_atrasado ++}
                            else if(controlEntrega[i].estado == 'ADELANTADO'){this.procesos_entrega_adelantado ++}
                            else if(controlEntrega[i].estado == 'EN TIEMPO'){this.procesos_entrega_tiempo ++}
                        }

                        console.log("prueba 04.5")


                    /*Cargar el comtrol del programa de entrega-Fin*/

                    console.log("prueba 1")

                    /*Calcular horizonte de planificacion minimo de los procesos*/
                    if(procesos.length != 0){
                        this.horizonte_planificacion_minimo = procesos[0].it_lanzamiento;
                        for(var i=1;i<procesos.length;i++){
                            if(parseFloat(procesos[i].it_lanzamiento) > parseFloat(this.horizonte_planificacion_minimo)){
                                this.horizonte_planificacion_minimo = procesos[i].it_lanzamiento;
                            }
                        }
                    }
                    console.log('El horizonte de planificacion minimo: ' + this.horizonte_planificacion_minimo)

                    console.log("prueba 2")

                    /*Calcular el precio al cliente final*/
                    if(procesos.length !=0){
                        for(var i=0;i<procesos.length;i++){
                            var producto = procesos[i].precio_producto_proceso * procesos[i].indice_actividad;
                            this.precio_cliente_final += producto;
                        }
                        this.precio_cliente_final = procesos[0].round(this.precio_cliente_final,2);
                    }

                    console.log("prueba 3")

                    this.id_scm_prueba = this.data[0].id_scm;
                    this.nombre_scm = this.data[0].nombre;
                    this.intervalo_numero_control=this.data[0].intervalo_numero_control;
                    this.norma_inventario_total_cadena = this.data[0].norma_inventario_total_cadena;
                    this.cumplimiento_norma_inventario = this.inventario_total_final * 100 / this.data[0].norma_inventario_total_cadena;

                    this.loading = false;
                } catch (error) {
                    utils.process_error(error);
                    this.loading = false;
                }
            },

            // async buscarEntidadGestora() {
            //     try {
            //
            //         var params = {"attr": {"id_scm": this.id_scm_selected} };
            //         params.relations=['entidad_gestora'];
            //
            //         var res =  await mb.statics('Scm').list(params);
            //         var scmSer = res.data.filter(this.filter_data);
            //
            //         if(scmSer.length>0){
            //             eventBus.idEntidadGestora = scmSer[0].id_entidad_gestora;
            //         }
            //
            //     } catch (error) {
            //         utils.process_error(error);
            //         this.loading = false;
            //     }
            // },


        // onEditing(model) {
        //         this.selected_model = mb.instance('Scm',model);
        //          if(eventBus.esAdmin){
        //           this.showModalForm();
        //             }else{
        //              utils.openNotificationWithIcon(
        //                 "error",
        //                 "Modificar scm.",
        //                 "Usted no puede modificar esta scm."
        //             );
        //                 }
        // }
        },

        mounted() {
            // this.esAdmin = eventBus.esAdmin;
            this.loading = true;
            // this.scm_selected=false;
            // this.data = [];
            this.load_data();
            // this.self = this;
            // this.pagination.$options.props = {
            //     load_data: this.load_data
            // };
        },

        updated(){
            // this.buscarEntidadGestora();

        }
    };
</script>

<style>
    @import "scm_resumen_list.css";
    .margen{
        margin-top: 0px;
    }

    @media (min-width: 992px) {
        .margen{
            margin-top: -35%;
        }
    }

    @media (min-width: 1100px) {
        .margen{
            margin-top: -33%;
        }
    }

    @media (min-width: 1200px) {
        .margen{
            margin-top: -32%;
        }
    }

    @media (min-width: 1300px) {
        .margen{
            margin-top: -25%;
        }
    }

    @media (min-width: 1353px) {
        .margen{
            margin-top: -20%;
        }
    }

    @media (min-width: 1370px) {
        .margen{
            margin-top: -17%;
        }
    }

    @media (min-width: 1420px) {
        .margen{
            margin-top: -15%;
        }
    }

    @media (min-width: 1600px) {
        .margen{
            margin-top: -14%;
        }
    }
</style>

