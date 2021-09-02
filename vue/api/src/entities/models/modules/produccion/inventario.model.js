import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
} from 'vuelidate/lib/validators';

import BaseModel from '../../base.model';

const url = 'produccion/inventario';

export default class Inventario extends BaseModel {

    no_intervalo
    procesos
    inventario    

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

    calcularInventario(programaLanzamiento,programaEntrega){
        var temp = programaLanzamiento-programaEntrega;
        if(temp<0){
            temp = 0;
        }
        // return Math.round(temp);
        return this.round(temp,2)
      };

    setInventario(lista){
        this.inventario= lista;
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
      ];
         var tamanno = 90/listaProcesos.length;
        for(var i=0; i<listaProcesos.length; i++){
          columnas[i+1]={
              title: 'Inventario en el proceso '+ listaProcesos[i].nombre + " (" + listaProcesos[i].unidad_medida.nombre +")",
              dataIndex: 'inventario['+i+']',
              align:'center',
              key: 'inventario['+i+']',
              width: tamanno,
          } ;
          cont=i+1;
        };


         return columnas;
    };

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