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
    decimal,
   
    
  } from 'vuelidate/lib/validators';

  import BaseModel from '../../base.model';

  import moment from 'moment';

  const url = 'reportes/registro';

    export default class Registro extends BaseModel {

       id_registro
       id_usuario
       id_entidad
       id_proceso
       nombre_proceso
       accion
       atributo
       tabla
       intervalo
       fecha_registro

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_registro = attributes.id_registro|| undefined
        this.id_usuario = attributes.id_usuario|| ''
        this.id_entidad = attributes.id_entidad|| ''
        this.id_proceso = attributes.id_proceso|| ''
        this.nombre_proceso = attributes.nombre_proceso|| ''
        this.accion = attributes.accion|| ''
        this.atributo = attributes.atributo|| ''
        this.tabla = attributes.tabla|| ''
        this.intervalo = attributes.intervalo|| ''
        this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null

      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_registro = attributes.id_registro
        this.id_usuario = attributes.id_usuario
        this.id_entidad = attributes.id_entidad
        this.id_proceso = attributes.id_proceso
        this.nombre_proceso = attributes.nombre_proceso
        this.accion = attributes.accion
        this.atributo = attributes.atributo
        this.tabla = attributes.tabla
        this.intervalo = attributes.intervalo
        this.fecha_registro = moment(attributes.fecha_registro)
      }
    }

    static validations = {
      registro: {
        accion: {
          required,
          maxLength: maxLength(45),
        },
        atributo: {
            required,
            maxLength: maxLength(45),
        },
        tabla: {
            required,
            maxLength: maxLength(45),
        },
        intervalo: {
            required,
            maxLength: maxLength(45),
        },
        fecha_registro: {
          required,
        },
          id_entidad: {
          required,
          integer,
        },
          id_usuario: {
          required,
          integer,
        },
          id_proceso: {
          required,
          integer,
        },
      },
    }
      
    static feedbacks = {
      entidad: {
      id_registro: {
        isUnique: 'This id_entidad has been taken' 

      },
      accion: {
        isUnique: 'Ya existe una entidad con este nombre' 
      },
      },
    }

  static columns = [
    {
      title: 'Accion',
      dataIndex: 'accion',
      align:'center',
      key: 'accion',
      width: '11.1%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Atributo',
      dataIndex: 'atributo',
      align:'center',
      key: 'atributo',
      width: '11.1%',
      // sorter: (a, b) =>  (a.telefono > b.telefono)-(a.telefono < b.telefono)
    },
    {
      title: 'Tabla',
      dataIndex: 'tabla',
      align:'center',
      key: 'tabla',
      width: '11.1%',
      // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
        title: 'Proceso',
        dataIndex: 'nombre_proceso',
        align:'center',
        key: 'proceso',
        width: '11.1%',
        // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
        title: 'Intervalo',
        dataIndex: 'intervalo',
        align:'center',
        key: 'intervalo',
        width: '11.1%',
        // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario.nombre',
      align:'center',
      key: 'usuario.nombre',
      width: '11.1%',
      sorter: (a, b) =>  (a.pais.nombre > b.pais.nombre)-(a.pais.nombre < b.pais.nombre)
    },
    {
      title: 'Entidad',
      dataIndex: 'entidad.nombre',
      align:'center',
      key: 'entidad.nombre',
      width: '11.1%',
      sorter: (a, b) =>  (a.provincia.nombre > b.provincia.nombre)-(a.provincia.nombre < b.provincia.nombre)
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      align:'center',
      key: 'fecha_registro',
      width: '11.1%',
      sorter: (a, b) => a.fecha_registro - b.fecha_registro
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      width: '11.14%',
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
      return this.id_registro;
    }
    class_name() {
        return 'Registro'
      }
  

   }

