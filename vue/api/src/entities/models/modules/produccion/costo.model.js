/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:15 GMT-05:00 2020  
*@time Mon Dec 28 11:12:15 GMT-05:00 2020  
*/
import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
  } from 'vuelidate/lib/validators';

  import BaseModel from '../../base.model';
  import proceso from '../gestion/proceso.model';
  

  // import moment from 'moment';

const url = 'produccion/costo';

    export default class Costo extends BaseModel {

       numero
       costo_gestion_base
       costo_gestion_ajustada
       costo_inventario_base
       costo_inventario_ajustada
       costo_total_base
       costo_total_ajustada
       id_proceso
       proceso

    constructor() {
      super();
      //  if (attributes != null) {
      //   this.id_costo = attributes.id_costo|| undefined
      //   this.id_proceso =attributes.id_proceso|| ''
      //   this.id_demanda =attributes.id_demanda|| ''
      //   this.id_inventario =attributes.id_inventario|| ''
      //   this.id_inventario_ajustado =attributes.id_inventario_ajustado||''

      //   this.costo_gestion_base = ''
      //   this.costo_gestion_ajustada =''
      //   this.costo_inventario_base =  ''
      //   this.costo_inventario_ajustada =  ''
      //   this.costo_total_base = ''
      //   this.costo_total_ajustada = ''
           this.calcularCostosTotales()
      //   this.calcularGeneral2()

      // }            
    }

    set_attributes() {
      if (attributes != null) {
             // this.id_costo = attributes.id_costo|| undefined
             //  this.id_proceso =attributes.id_proceso|| ''
             //  this.id_demanda =attributes.id_demanda|| ''
             //  this.id_inventario =attributes.id_inventario|| ''
             //  this.id_inventario_ajustado =attributes.id_inventario_ajustado||''

             //  this.costo_gestion_base = ''
             //  this.costo_gestion_ajustada =''
             //  this.costo_inventario_base =  ''
             //  this.costo_inventario_ajustada =  ''
             //  this.costo_total_base = ''
             //  this.costo_total_ajustada = ''
             this.calcularCostosTotales()
             //  this.calcularGeneral2()
            }
    }

    static validations = {
      costo: {
        // id_costo: {
        //   required,
        //   integer,
        // },
        // id_proceso: {
        //   required,
        //   integer,
        // },
        // id_inventario: {
        //   required,
        //   integer,
        // },
        // id_inventario_ajustado: {
        //   required,
        //   integer,
        // },
        // id_demanda: {
        //   required,
        //   integer,
        // },
        costo_gestion_base: {
          
          decimal,
        },
        costo_gestion_ajustada: {
          
          decimal,
        },
        costo_inventario_base: {
          
          decimal,
        },
        costo_inventario_ajustada: {
         
          decimal,
        },
        costo_total_base: {
          
          decimal,
        },
        costo_total_ajustada: {
          
          decimal,
        },
        // general: {
          
        //   decimal,
        // },
        // general2: {
          
        //   decimal,
        // },
      },
    }

    static feedbacks = {
      costo: {
      id_costo: {
        isUnique: 'This id_costo has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'No',
      dataIndex: 'numero',
      align:'center',
      key: 'numero',
      width: '5%',
    },
    {
      title: 'Proceso',
      dataIndex: 'proceso.nombre',
      align:'center',
      key: 'proceso',
      width: '16%',
    },
    {
      title: 'Costo de Gestión Base',
      dataIndex: 'costo_gestion_base',
      align:'center',
      key: 'costo_gestion_base',
      width: '14%',
      sorter: (a, b) => a.costo_gestion_base - b.costo_gestion_base
    },
    {
      title: 'Costo de Gestión Ajustada',
      dataIndex: 'costo_gestion_ajustada',
      align:'center',
      key: 'costo_gestion_ajustada',
      width: '14%',
      sorter: (a, b) => a.costo_gestion_ajustada - b.costo_gestion_ajustada
    },
    {
      title: 'Costo de Inventario Base',
      dataIndex: 'costo_inventario_base',
      align:'center',
      key: 'costo_inventario_base',
      width: '14%',
      sorter: (a, b) => a.costo_inventario_base - b.costo_inventario_base
    },
    {
      title: 'Costo de Inventario Ajustada',
      dataIndex: 'costo_inventario_ajustada',
      align:'center',
      key: 'costo_inventario_ajustada',
      width: '14%',
      sorter: (a, b) => a.costo_inventario_ajustada - b.costo_inventario_ajustada
    },
     {
      title: 'Costo Total Base',
      dataIndex: 'costo_total_base',
      align:'center',
      key: 'costo_total_base',
      width: '14%',
      sorter: (a, b) => a.general - b.general
    },
     {
      title: 'Costo Total Ajustada',
      dataIndex: 'costo_total_ajustada',
      align:'center',
      key: 'costo_total_ajustada',
      width: '14%',
      sorter: (a, b) => a.general2 - b.general2
    },
  ];

  setNumero(no_intervalo){
        this.numero = parseInt(no_intervalo);
    };

  calcularCostosTotales(){
       var temp = this.costo_gestion_base + this.costo_inventario_base;
       this.costo_total_base = this.round(temp,3);
       var temp1 = this.costo_gestion_ajustada + this.costo_inventario_ajustada;
       this.costo_total_ajustada = this.round(temp1,3);
    };

    setProceso(proceso){
      this.proceso = proceso;
    };

    calcularCostoGestionBase(demandaFinalTotal,costoProceso){
      var temp = demandaFinalTotal*costoProceso;
      this.costo_gestion_base = this.round(temp,3);
    };

    calcularCostoGestionAjustada(demandaAgrupadaTotal,costoProceso){
      var temp = demandaAgrupadaTotal*costoProceso;
      this.costo_gestion_ajustada= this.round(temp,3);
    };

    calcularCostoInventarioBase(inventarioTotal,costoInventario){
      var temp = inventarioTotal*costoInventario;
      this.costo_inventario_base= this.round(temp,3);
    };

    calcularCostoInventarioAjustado(inventarioAjustadoTotal,costoInventario){
      var temp = inventarioAjustadoTotal*costoInventario;
      this.costo_inventario_ajustada= this.round(temp,3);
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

    // setCostoGestionBase(lista){
    //     this.costo_gestion_base = lista;
    // };
    // setCostoGestionAjustada(lista){
    //     this.costo_gestion_ajustada= lista;
    // };
    // setCostoInventarioBase(lista){
    //     this.costo_inventario_base= lista;
    // };
    // setCostoInventarioAjustado(lista){
    //     this.costo_inventario_ajustada= lista;
    // };

    //  round(num, decimales = 2) {
    //     var signo = (num >= 0 ? 1 : -1);
    //     num = num * signo;
    //     if (decimales === 0) //con 0 decimales
    //         return signo * Math.round(num);
    //     // round(x * 10 ^ decimales)
    //     num = num.toString().split('e');
    //     num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    //     // x * 10 ^ (-decimales)
    //     num = num.toString().split('e');
    //     return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
    // }


    // static get url() {
    //   return url
    // };
  
    // get url() {
    //   return url
    // };
  
    // get_id() {
    //   return this.id_costo;
    // }
    // class_name() {
    //     return 'Costo'
    //   }

}