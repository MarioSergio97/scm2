import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
} from 'vuelidate/lib/validators';

import BaseModel from '../../base.model';

const url = 'produccion/controlEntrega';

export default class ControlEntrega extends BaseModel {

    id_control
    id_proceso
    lead_time_entrega
    plan_acumulado_entrega
    real_acumulado_entrega
    porciento_cumplimiento
    deficit
    estado
    asegurado_hasta_intervalo
    proceso
    estado_flujo

    constructor(attributes = null) {
        super();
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

    static columns = [
        {
            title: 'Proceso',
            dataIndex: 'proceso.nombre',
            align:'center',
            key: 'proceso.nombre',
            width: '13%',
            sorter: (a, b) => a.no_intervalo - b.no_intervalo
        },
        {
            title: 'Lead time de entrega',
            dataIndex: 'lead_time_entrega',
            align:'center',
            key: 'lead_time_entrega',
            width: '13%',
            sorter: (a, b) => a.no_intervalo - b.no_intervalo
        },
        {
            title: 'Plan acumulado de entrega',
            dataIndex: 'plan_acumulado_entrega',
            align:'center',
            key: 'plan_acumulado_entrega',
            width: '13%',
        },
        {
            title: 'Real acumulado de entrega',
            dataIndex: 'real_acumulado_entrega',
            align:'center',
            key: 'real_acumulado_entrega',
            width: '13%',
        },
        {
            title: 'Porciento de cumplimiento',
            dataIndex: 'porciento_cumplimiento',
            align:'center',
            key: 'porciento_cumplimiento',
            width: '13%',
        },
        {
            title: 'Déficit',
            dataIndex: 'deficit',
            align:'center',
            key: 'deficit',
            width: '13%',
            sorter: (a, b) => a.fecha - b.fecha
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            align:'center',
            key: 'estado',
            width: '13%',
            sorter: (a, b) =>  (a.scm.nombre > b.scm.nombre)-(a.scm.nombre < b.scm.nombre)
        },
        {
            title: 'Asegurado hasta el intervalo',
            dataIndex: 'asegurado_hasta_intervalo',
            align:'center',
            key: 'asegurado_hasta_intervalo',
            width: '13%',
            sorter: (a, b) =>  (a.scm.nombre > b.scm.nombre)-(a.scm.nombre < b.scm.nombre)
        },
    ];

    setProceso(proceso){
        this.proceso = proceso;
        this.lead_time_entrega = proceso.lt_entrega;
        this.id_proceso = proceso.id_proceso;
    }

    setRealAcumulado(realAcumulado){
        this.real_acumulado_entrega = realAcumulado;
    }

    setEstadoFlujo(estadoFlujo){
        this.estado_flujo = estadoFlujo;
    }

    calcularPorcientoCumplimiento(){
        var temp;

        if(this.plan_acumulado_entrega == 0){
            temp = 0;
        }else{
            temp = this.real_acumulado_entrega*100/this.plan_acumulado_entrega;
        }
        this.porciento_cumplimiento = this.round(temp,1);
    }

    calcularDefici(){
        var temp;

        if(this.real_acumulado_entrega<this.plan_acumulado_entrega){
            temp = this.plan_acumulado_entrega - this.real_acumulado_entrega;
        }else{
            temp =0;
        }

        this.deficit = temp;
    }

    determinarEstado(){
        var temp="EN TIEMPO";

        if(this.plan_acumulado_entrega == 0){
            temp = "";
        }else {
            if (this.real_acumulado_entrega<this.plan_acumulado_entrega*0.95){
                temp = "ATRASADO";
            }
            if (this.real_acumulado_entrega>this.plan_acumulado_entrega*1.05){
                temp = "ADELANTADO";
            }
        }

        this.estado = temp;
    }

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
    }

}