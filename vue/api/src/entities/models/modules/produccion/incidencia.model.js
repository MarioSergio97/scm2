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

  import moment from 'moment';

  const url = 'produccion/incidencia';

    export default class Incidencia extends BaseModel {

       id_incidencia
       descripcion
       fecha_registro
       id_proceso

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_incidencia = attributes.id_incidencia|| undefined
        this.descripcion = attributes.descripcion|| ''
        this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null
        this.id_proceso = attributes.id_proceso|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_incidencia = attributes.id_incidencia
        this.descripcion = attributes.descripcion
        this.fecha_registro = moment(attributes.fecha_registro)
        this.id_proceso = attributes.id_proceso
      }
    }

    static validations = {
      incidencia: {
        descripcion: {
          required,
          maxLength: maxLength(65535),
        },
        fecha_registro: {
          required,
        },
        id_proceso: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      incidencia: {
      id_incidencia: {
        isUnique: 'This id_incidencia has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Proceso',
      dataIndex: 'proceso.nombre',
      align:'center',
      key: 'proceso.nombre',
      width: '25%',
      sorter: (a, b) =>  (a.proceso.nombre > b.proceso.nombre)-(a.proceso.nombre < b.proceso.nombre)
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      align:'center',
      key: 'descripcion',
      width: '25%',
      // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      align:'center',
      key: 'fecha_registro',
      width: '25%',
      sorter: (a, b) => a.fecha_registro - b.fecha_registro
    },
    
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      align:'center',
      width: '25%',
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
      return this.id_incidencia;
    }
    class_name() {
        return 'Incidencia'
      }
  

   }

