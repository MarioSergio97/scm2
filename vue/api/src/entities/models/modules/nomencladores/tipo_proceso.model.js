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

  const url = 'nomencladores/tipo_proceso';

    export default class Tipo_proceso extends BaseModel {

       id_tipo_proceso
       nombre
       descripcion

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_tipo_proceso = attributes.id_tipo_proceso|| undefined
        this.nombre = attributes.nombre|| ''
        this.descripcion = attributes.descripcion|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_tipo_proceso = attributes.id_tipo_proceso
        this.nombre = attributes.nombre
        this.descripcion = attributes.descripcion
      }
    }

    static validations = {
      tipo_proceso: {
        nombre: {
          required,
        },
        descripcion: {
          required,
          maxLength: maxLength(65535),
        },
      },
    }

    static feedbacks = {
      tipo_proceso: {
      id_tipo_proceso: {
        isUnique: 'This id_tipo_proceso has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '30%',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      align:'center',
      key: 'descripcion',
      width: '60%',
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      width: '10%',
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
      return this.id_tipo_proceso;
    }
    class_name() {
        return 'Tipo_proceso'
      }
  

   }

