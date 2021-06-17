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

  const url = 'nomencladores/unidad_medida';

    export default class Unidad_medida extends BaseModel {

       id_um
       nombre

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_um = attributes.id_um|| undefined
        this.nombre = attributes.nombre|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_um = attributes.id_um
        this.nombre = attributes.nombre
      }
    }

    static validations = {
      unidad_medida: {
        nombre: {
          required,
        },
      },
    }

    static feedbacks = {
      unidad_medida: {
      id_um: {
        isUnique: 'This id_um has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '20%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      fixed: 'right',
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
      return this.id_um;
    }
    class_name() {
        return 'Unidad_medida'
      }
  

   }

