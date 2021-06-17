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

  const url = 'produccion/producto';

    export default class Producto extends BaseModel {

       id_producto
       nombre
       id_um

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_producto = attributes.id_producto|| undefined
        this.nombre = attributes.nombre|| ''
        this.id_um = attributes.id_um|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_producto = attributes.id_producto
        this.nombre = attributes.nombre
        this.id_um = attributes.id_um
      }
    }

    static validations = {
      producto: {
        nombre: {
          required,
        },
        id_um: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      producto: {
      id_producto: {
        isUnique: 'This id_producto has been taken' 

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
      title: 'Um',
      dataIndex: 'um.nombre',
      align:'center',
      key: 'um.nombre',
      width: '20%',
      sorter: (a, b) =>  (a.um.nombre > b.um.nombre)-(a.um.nombre < b.um.nombre)
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
      return this.id_producto;
    }
    class_name() {
        return 'Producto'
      }
  

   }

