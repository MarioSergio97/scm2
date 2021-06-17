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

  const url = 'gestion/parametro_capacidad';

    export default class Parametro_capacidad extends BaseModel {

       id_parametro
       nombre
       valor
       id_capacidad

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_parametro = attributes.id_parametro|| undefined
        this.nombre = attributes.nombre|| ''
        this.valor = attributes.valor|| ''
        this.id_capacidad = attributes.id_capacidad|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_parametro = attributes.id_parametro
        this.nombre = attributes.nombre
        this.valor = attributes.valor
        this.id_capacidad = attributes.id_capacidad
      }
    }

    static validations = {
      parametro_capacidad: {
        nombre: {
          required,
        },
        valor: {
          required,
          decimal,
        },
        id_capacidad: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      parametro_capacidad: {
      id_parametro: {
        isUnique: 'This id_parametro has been taken' 

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
      title: 'Valor',
      dataIndex: 'valor',
      align:'center',
      key: 'valor',
      width: '20%',
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacidad.id_capacidad',
      align:'center',
      key: 'capacidad.id_capacidad',
      width: '20%',
      sorter: (a, b) => a.capacidad.id_capacidad - b.capacidad.id_capacidad
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
      return this.id_parametro;
    }
    class_name() {
        return 'Parametro_capacidad'
      }
  

   }

