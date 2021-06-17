import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
} from 'vuelidate/lib/validators';

import BaseModel from '../../base.model';

const url = 'produccion/inventarioAjustado';

export default class InventarioAjustado extends BaseModel {

    no_intervalo
    procesos
    inventario_ajustado  

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

    buscarNI(leadTime){
      return this.no_intervalo + parseInt(leadTime);
    };

    setIntervalo(no_intervalo){
        this.no_intervalo = parseInt(no_intervalo);        
    };

    setProcesos(procesos){
      this.procesos = procesos;
    };

    calcularInventarioAjustado(invent,programaLanzamiento,programaLanzamientoAjustado){
        var temp = invent+programaLanzamiento-programaLanzamientoAjustado;
        if(temp<0){
            temp=0;
        }
        return Math.round(temp);
      };

    setInventario(lista){
        this.inventario_ajustado= lista;
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
              width: '20%',
          },          
      ];
        for(var i=0; i<listaProcesos.length; i++){
          columnas[i+1]={
              title: 'Inventario Ajustado en el proceso '+ listaProcesos[i],
              dataIndex: 'inventario_ajustado['+i+']',
              align:'center',
              key: 'inventario_ajustado['+i+']',
              width: '20%',
          } ;
          cont=i+1;
        };

        // columnas[cont+1]= {
        //     title: 'Acciones',
        //     key: 'action_elements',
        //     fixed: 'right',
        //     width: '15%',
        //     scopedSlots: {
        //         customRender: 'action'
        //     }
        // };

         return columnas;
    };

}