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
                        <a-button-group style="margin-bottom: 10px">
                            <a-tooltip placement="topLeft" title="Acceder a la SCM seleccionada">
                                <a-button icon="plus" type="primary" @click="selectSCM_action">Entrar</a-button>
                            </a-tooltip>
                            <a-tooltip placement="topLeft" title="Añadir nuevo elemento" v-if="esAdmin">
                                <a-button icon="plus" type="primary" @click="showModalForm">Añadir</a-button>
                            </a-tooltip>
                            <!--<a-tooltip placement="topLeft" title="Eliminar elementos seleccionados">-->
                            <!--<a-button icon="delete" type="danger" @click="showDeleteConfirm">Eliminar</a-button>-->
                            <!--</a-tooltip>-->
                        </a-button-group>
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
            <h6 style="text-align: left">Listado de Scm</h6>
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

            <a-modal
                    @cancel="onCloseModal"
                    :title="selected_model.get_id()?'Actualizar scm':'Añadir scm'"
                    class="modal-form"
                    width="55rem"
                    :visible="show_modal_form"
                    :destroyOnClose="true"
                    on-ok="handleOk"
                    :header="null"
                    :footer="null"
                    :maskClosable="false"

            >
                <scm_form  :modal=true :model="selected_model" />
            </a-modal>

            <a-table
                    :columns="columns"
                    :rowKey="record => record.id_scm"
                    :dataSource="data"
                    :rowSelection="rowSelection"
                    :loading="loading"
                    :pagination="pagination.$data"
                    :scroll="{ x: '240%', y: 240 }"
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
    import scm_form from "../form/scm_form";
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
            };
        },


        inject: {
            scmSelect: { default: ()=>{} },
        },

        components: {
            action_buttons,
            pagination_functions,
            vantdpagination,
            scm_form
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
            rowSelection() {

                const { selectedRowKeys } = this;
                return {
                    type: 'radio',
                    selectedRowKeys,
                    hideDefaultSelections: true,
                    selections: [
                        {
                            key: "all-data",
                            text: this.text_select,
                            onSelect: () => {
                                if (this.selectedRowKeys.length == this.data.length) {
                                    this.selectedRowKeys = [];
                                } else {
                                    this.selectedRowKeys = this.data.map(e => {
                                        return e.id_scm;
                                    });
                                }
                            }
                        }
                    ],
                    onSelection: this.onSelection,
                    onChange: this.onChange,
                };
            }
        },

        methods: {

            selectSCM_action(){
                if (this.selectedRowKeys.length == 0) {
                    utils.openNotificationWithIcon(
                        "error",
                        "Entrar a la cadena de suministro.",
                        "Debe seleccionar una cadena de suministro."
                    );
                    return;
                }
                else{
                    this.scmSelect();
                }                
            },

            exportToExcel () {
                utils.exportToExcelVinstance(this)
            },

            exportToCSV () {
                utils.exportToCSV(this)
            },

            onCloseModal(e,reload_data=false) {
                this.selected_model = mb.instance('Scm');
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
                this.id_scm_selected = selectedRowKeys[0];
                // eventBus.cambiarSCM(this.id_scm_selected);
                eventBus.idScmSelected = this.id_scm_selected;


                if(this.id_scm_selected==null){
                    this.scm_selected=false;
                }else{
                    this.scm_selected=true;
                }
                eventBus.scmSelected = this.scm_selected;

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
                            const response = await mb.statics('Scm').delete_by_ids(
                                _this.selectedRowKeys
                            );
                            utils.process_response(response, "deleted");
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
                    var params = {};
                    params.relations=['entidad_gestora'];

                    const resp = await mb.statics('Scm').list(params);
                    this.scm_list = resp;
                    this.data = this.scm_list.data.filter(this.filter_data);

                    var it= eventBus.inventarioTotal;

                     for (var i=0;i<this.data.length;i++){

                        this.cumplimiento = it * 100 / this.data[i].norma_inventario_total_cadena;
                    this.data[i].cumplimiento_norma_inventario = this.cumplimiento;            

            }
                    

                    this.loading = false;
                } catch (error) {
                    utils.process_error(error);
                    this.loading = false;
                }
            },

            async buscarEntidadGestora() {
                try {

                    var params = {"attr": {"id_scm": this.id_scm_selected} };
                    params.relations=['entidad_gestora'];

                    var res =  await mb.statics('Scm').list(params);
                    var scmSer = res.data.filter(this.filter_data);

                    if(scmSer.length>0){
                        eventBus.idEntidadGestora = scmSer[0].id_entidad_gestora;
                    }

                } catch (error) {
                    utils.process_error(error);
                    this.loading = false;
                }
            },


            onEditing(model) {
                this.selected_model = mb.instance('Scm',model);
                 if(eventBus.esAdmin){
          this.showModalForm();
      }else{
        utils.openNotificationWithIcon(
                        "error",
                        "Modificar scm.",
                        "Usted no puede modificar esta scm."
                    );
      }
            }
        },

        mounted() {
            this.esAdmin = eventBus.esAdmin;
            this.loading = true;
            this.scm_selected=false;
            this.data = [];
            this.load_data();
            this.self = this;
            this.pagination.$options.props = {
                load_data: this.load_data
            };
        },

        updated(){
            this.buscarEntidadGestora();

        }
    };
</script>

<style>
    @import "scm_list.css";
</style>

