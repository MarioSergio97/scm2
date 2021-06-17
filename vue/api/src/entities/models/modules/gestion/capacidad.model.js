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

  const url = 'gestion/capacidad';

    export default class Capacidad extends BaseModel {

       id_capacidad
       id_proceso

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_capacidad = attributes.id_capacidad|| undefined
        this.id_proceso = attributes.id_proceso|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_capacidad = attributes.id_capacidad
        this.id_proceso = attributes.id_proceso
      }
    }

    static validations = {
      capacidad: {
        id_proceso: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      capacidad: {
      id_capacidad: {
        isUnique: 'This id_capacidad has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Proceso',
      dataIndex: 'proceso.nombre',
      align:'center',
      key: 'proceso.nombre',
      width: '85%',
      sorter: (a, b) =>  (a.proceso.nombre > b.proceso.nombre)-(a.proceso.nombre < b.proceso.nombre)
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      align:'center',
      width: '15%',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ];

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_capacidad;
    }
    class_name() {
        return 'Capacidad'
      }
  

   }

