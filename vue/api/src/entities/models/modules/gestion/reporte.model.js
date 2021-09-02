/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:15 GMT-05:00 1414  
*@time Mon Dec 28 11:12:15 GMT-05:00 1414  
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

  const url = 'gestion/reporte';

    export default class Reporte extends BaseModel {

       id_reporte
       lanzamiento
       entregado
       id_proceso
       proceso
       inventario
       inventario_final


    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_reporte = attributes.id_reporte|| undefined
        this.lanzamiento = attributes.lanzamiento|| ''
        this.entregado = attributes.entregado|| ''
        this.id_proceso = attributes.id_proceso|| ''
        this.proceso = attributes.proceso|| ''
        this.inventario = ''
        this.inventario_final = ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_reporte = attributes.id_reporte
        this.lanzamiento = attributes.lanzamiento
        this.entregado = attributes.entregado
        this.id_proceso = attributes.id_proceso
        this.proceso = attributes.proceso
        this.inventario = ''
        this.inventario_final = ''
      }
    }

    static validations = {
      reporte: {
        lanzamiento: {
          required,
          decimal,
        },
        entregado: {
          required,
          decimal,
        },
        id_proceso: {
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_reporte,id_proceso}=object
          const params={id_reporte,id_proceso}
          const _scenario=id_reporte?'update':'create'
          const validation= await Reporte.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        },
         required,
          integer,
        },
        inventario: {
            integer,
        },
        inventario_final: {
            integer,
        },
      },
    }

    static feedbacks = {
      reporte: {
      id_reporte: {
        isUnique: 'This id_reporte has been taken' 

      },
      id_proceso: {
        isUnique: 'Este proceso ya tiene su reporte' 

      },

    }
      }

  static columns = [
    {
        title: 'Proceso',
        dataIndex: 'proceso.nombre',
        align:'center',
        key: 'proceso.nombre',
        width: '14%',
        // sorter: (a, b) =>  (a.proceso.nombre > b.proceso.nombre)-(a.proceso.nombre < b.proceso.nombre)
    },
    {
        title: 'Lanzamiento',
        dataIndex: 'lanzamiento',
        align:'center',
        key: 'lanzamiento',
        width: '14%',
    },
    {
        title: 'Entregado',
        dataIndex: 'entregado',
        align:'center',
        key: 'entregado',
        width: '14%',
    },
    {
        title: 'Inventario del proceso (en um)',
        dataIndex: 'inventario',
        align:'center',
        key: 'inventario',
        width: '14%',
    },
    {
        title: 'Inventario del proceso (en producto final)',
        dataIndex: 'inventario_final',
        align:'center',
        key: 'inventario_final',
        width: '14%',
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      width: '5%',
      align:'center',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ];

    calcularIProcUM(indActividad){
      var temp = (this.lanzamiento-this.entregado)*indActividad;
      this.inventario = Math.round(temp);
    };

    calcularIProcFinal(indActividad){
      var temp=0;
      if(indActividad==0){
        temp=0;
      }
      else {
        temp = (this.lanzamiento-this.entregado)*indActividad/indActividad;
      }

      this.inventario_final=Math.round(temp);
    };

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_reporte;
    }
    class_name() {
        return 'Reporte'
      }
  

   }

