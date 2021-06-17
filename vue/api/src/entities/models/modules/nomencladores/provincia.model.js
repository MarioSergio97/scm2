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

  const url = 'nomencladores/provincia';

    export default class Provincia extends BaseModel {

       id_provincia
       nombre

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_provincia = attributes.id_provincia|| undefined
        this.nombre = attributes.nombre|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_provincia = attributes.id_provincia
        this.nombre = attributes.nombre
      }
    }

    static validations = {
      provincia: {
        nombre: {
          required,
        },
      },
    }

    static feedbacks = {
      provincia: {
      id_provincia: {
        isUnique: 'This id_provincia has been taken' 

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
      return this.id_provincia;
    }
    class_name() {
        return 'Provincia'
      }
  

   }

