import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
} from 'vuelidate/lib/validators';

import BaseModel from '../../base.model';

const url = 'produccion/programaEntrega';

export default class ProgramaEntrega extends BaseModel {

    no_intervalo
    entrega_acumulado
    demanda_intervalo
    demanda_acumulada
    procesos

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
      var temp = this.demanda_intervalo + parseInt(demandaAcumuladaAnterior);
      this.demanda_acumulada = temp;
    };

    setProcesos(procesos){
      this.procesos = procesos;
    };

    calcularEntregaAcumulada(demaAcum,ia,porcDem){
      var temp = demaAcum*ia*porcDem/100;
      return Math.round(temp);
    };

    setEntregaAcumulada(lista){
        this.entrega_acumulado = lista;
    };

    buscarNI(leadTime){
      return this.no_intervalo + parseInt(leadTime);
    };

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
              width: '10%',
          },
          {
              title: 'Demanda en el intervalo',
              dataIndex: 'demanda_intervalo',
              align:'center',
              key: 'demanda_intervalo',
              width: '10%',
          },
          {
              title: 'Demanda acumulada',
              dataIndex: 'demanda_acumulada',
              align:'center',
              key: 'demanda_acumulada',
              width: '10%',
          },
      ];
        for(var i=0; i<listaProcesos.length; i++){
          columnas[i+3]={
              title: 'Entrega acumulado en el proceso '+ listaProcesos[i],
              dataIndex: 'entrega_acumulado['+i+']',
              align:'center',
              key: 'entrega_acumulado['+i+']',
              width: '20%',
          } ;
          cont=i+3;
        };

         return columnas;
    };

}