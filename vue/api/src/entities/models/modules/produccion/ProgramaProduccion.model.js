import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
} from 'vuelidate/lib/validators';

import BaseModel from '../../base.model';

const url = 'produccion/programaProduccion';

export default class ProgramaProduccionModel extends BaseModel {

    no_intervalo
    demanda_intervalo
    demanda_acumulada
    procesos
    entregas_acumuladas  //Lista donde se almacenan las entregas acumuladas de cada proceso en el intervalo

    constructor(attributes = null) {
        super();
        // ProgramaLanzamiento.crearColumnas();
        // if (attributes != null) {
        //
        //     this.id_control = attributes.id_control|| undefined
        //     this.id_proceso = attributes.id_proceso|| ''
        //     this.lead_time_lanzamiento = attributes.lead_time_lanzamiento|| ''
        //     this.plan_acumulado_lanzamiento = attributes.plan_acumulado_lanzamiento|| ''
        //     this.porciento_cumplimiento = attributes.porciento_cumplimiento|| ''
        //     this.deficit = attributes.deficit|| ''
        //     this.estado = attributes.estado|| ''
        //     this.asegurado_hasta_intervalo = attributes.asegurado_hasta_intervalo|| ''
        // }

    }

    set_attributes(attributes = null) {
        // if (attributes != null) {
        //
        //     this.id_control = attributes.id_control
        //     this.id_proceso = attributes.id_proceso
        //     this.lead_time_lanzamiento = attributes.lead_time_lanzamiento
        //     this.plan_acumulado_lanzamiento = attributes.plan_acumulado_lanzamiento
        //     this.porciento_cumplimiento = attributes.porciento_cumplimiento
        //     this.deficit = attributes.deficit
        //     this.estado = attributes.estado
        //     this.asegurado_hasta_intervalo = attributes.asegurado_hasta_intervalo
        // }
    }

    // static columns = [
    //     {
    //         title: 'No Intervalo',
    //         dataIndex: 'no_intervalo',
    //         align:'center',
    //         key: 'no_intervalo',
    //         width: '20%',
    //     },
    //     {
    //         title: 'Demanda en el intervalo',
    //         dataIndex: 'demanda_intervalo',
    //         align:'center',
    //         key: 'demanda_intervalo',
    //         width: '20%',
    //     },
    //     {
    //         title: 'Demanda acumulada',
    //         dataIndex: 'demanda_acumulada',
    //         align:'center',
    //         key: 'demanda_acumulada',
    //         width: '20%',
    //     },
    //     {
    //         title: 'Acciones',
    //         key: 'action_elements',
    //         fixed: 'right',
    //         width: '15%',
    //         scopedSlots: {
    //             customRender: 'action'
    //         }
    //     }
    // ];

    setAtributosDemanda(no_intervalo,demanda_intervalo){
        this.no_intervalo = parseInt(no_intervalo);
        this.demanda_intervalo = parseInt(demanda_intervalo);
    };

    calcularDemandaAcumulada(demandaAcumuladaAnterior){
        var temp = this.demanda_intervalo + demandaAcumuladaAnterior;
        this.demanda_acumulada = temp;
    };

    setProcesos(procesos){
        this.procesos = procesos;
    };

    setEntrgasAcumuladas(lista){
        this.entregas_acumuladas = lista;
    }

    static crearColumnas(listaProcesos){

        var cont=2;
        var list=[];
        list = listaProcesos;

        var columnas = [
            {
                title: 'No Intervalo',
                dataIndex: 'no_intervalo',
                align:'center',
                key: 'no_intervalo',
                width: '5%',
            },
            {
                title: 'Demanda en el intervalo',
                dataIndex: 'demanda_intervalo',
                align:'center',
                key: 'demanda_intervalo',
                width: '5%',
            },
            {
                title: 'Demanda acumulada',
                dataIndex: 'demanda_acumulada',
                align:'center',
                key: 'demanda_acumulada',
                width: '5%',
            },
        ];
        var tamanno = 75/listaProcesos.length;
        for(var i=0; i<listaProcesos.length; i++){
            columnas[i+3]={
                title: 'Entrega acumulada en el proceso '+ listaProcesos[i].nombre + " (" + listaProcesos[i].unidad_medida.nombre +")",
                dataIndex: 'entregas_acumuladas['+i+']',
                align:'center',
                key: 'entregas_acumuladas['+i+']',
                width: tamanno,
            } ;
            cont=i+3;
        };


        return columnas;
    };

}