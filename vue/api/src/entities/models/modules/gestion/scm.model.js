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

  const url = 'gestion/scm';

    export default class Scm extends BaseModel {

       id_scm
       nombre
       descripcion
       fecha_registro
       unidad_tiempo_demanda
       id_entidad_gestora

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_scm = attributes.id_scm|| undefined
        this.nombre = attributes.nombre|| ''
        this.descripcion = attributes.descripcion|| ''
        this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null
        this.unidad_tiempo_demanda = attributes.unidad_tiempo_demanda|| ''
        this.id_entidad_gestora = attributes.id_entidad_gestora|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_scm = attributes.id_scm
        this.nombre = attributes.nombre
        this.descripcion = attributes.descripcion
        this.fecha_registro = moment(attributes.fecha_registro)
        this.unidad_tiempo_demanda = attributes.unidad_tiempo_demanda
        this.id_entidad_gestora = attributes.id_entidad_gestora
      }
    }

    static validations = {
      scm: {
        nombre: {
          required,
          maxLength: maxLength(45),
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_scm,nombre}=object
          const params={id_scm,nombre}
          const _scenario=id_scm?'update':'create'
          const validation= await Scm.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        }
        },
        descripcion: {
          maxLength: maxLength(65535),
        },
        fecha_registro: {
          required,
        },
        unidad_tiempo_demanda: {
          required,
        },
        id_entidad_gestora: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      scm: {
      id_scm: {
        isUnique: 'This id_scm has been taken'

      },
      nombre: {
        isUnique: 'Ya existe una cadena de suministro con este nombre'
      },
      },
    }

  static columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '16.66%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      align:'center',
      key: 'descripcion',
      width: '16.66%',
      // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },    
    {
      title: 'Unidad de tiempo de demanda',
      dataIndex: 'unidad_tiempo_demanda',
      align:'center',
      key: 'unidad_tiempo_demanda',
      width: '16.66%',
      // sorter: (a, b) =>  (a.unidad_tiempo_demanda > b.unidad_tiempo_demanda)-(a.unidad_tiempo_demanda < b.unidad_tiempo_demanda)
    },
    {
      title: 'Entidad gestora',
      dataIndex: 'entidad_gestora.nombre',
      align:'center',
      key: 'entidad_gestora.nombre',
      width: '16.66%',
      sorter: (a, b) =>  (a.entidad_gestora.nombre > b.entidad_gestora.nombre)-(a.entidad_gestora.nombre < b.entidad_gestora.nombre)
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      align:'center',
      key: 'fecha_registro',
      width: '16.66%',
      sorter: (a, b) => a.fecha_registro - b.fecha_registro
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      align:'center',
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
      return this.id_scm;
    }
    class_name() {
        return 'Scm'
      }
   }

