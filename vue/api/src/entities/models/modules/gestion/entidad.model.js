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

  const url = 'gestion/entidad';

    export default class Entidad extends BaseModel {

       id_entidad
       nombre
       telefono
       descripcion
       fecha_registro
       id_provincia
       id_pais

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_entidad = attributes.id_entidad|| undefined
        this.nombre = attributes.nombre|| ''
        this.telefono = attributes.telefono|| ''
        this.descripcion = attributes.descripcion|| ''
        this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null
        this.id_provincia = attributes.id_provincia|| ''
        this.id_pais = attributes.id_pais|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_entidad = attributes.id_entidad
        this.nombre = attributes.nombre
        this.telefono = attributes.telefono
        this.descripcion = attributes.descripcion
        this.fecha_registro = moment(attributes.fecha_registro)
        this.id_provincia = attributes.id_provincia
        this.id_pais = attributes.id_pais
      }
    }

    static validations = {
      entidad: {
        nombre: {          
        async isUnique(value,object) {
          if(!value)
             return true
          const _specific=true
          const {id_entidad,nombre}=object;
          const params={id_entidad,nombre}
          const _scenario=id_entidad?'update':'create'
          const validation= await Entidad.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
          },
          required,
        maxLength: maxLength(45),
        },
        telefono: {
           integer,
           minLength: minLength(8),
           maxLength: maxLength(10),
        },
        descripcion: {          
          maxLength: maxLength(65535),
        },
        fecha_registro: {
          required,
        },
        id_provincia: {          
          integer,
        },
        id_pais: {
          required,
          integer,
        },
      },
    }
      
    static feedbacks = {
      entidad: {
      id_entidad: {
        isUnique: 'This id_entidad has been taken' 

      },
      nombre: {
        isUnique: 'Ya existe una entidad con este nombre' 
      },
      },
    }

  static columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '14.285714285714285714285714285714%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      align:'center',
      key: 'telefono',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.telefono > b.telefono)-(a.telefono < b.telefono)
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      align:'center',
      key: 'descripcion',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
      title: 'País',
      dataIndex: 'pais.nombre',
      align:'center',
      key: 'pais.nombre',
      width: '14.285714285714285714285714285714%',
      sorter: (a, b) =>  (a.pais.nombre > b.pais.nombre)-(a.pais.nombre < b.pais.nombre)
    },
    {
      title: 'Provincia',
      dataIndex: 'provincia.nombre',
      align:'center',
      key: 'provincia.nombre',
      width: '14.285714285714285714285714285714%',
      sorter: (a, b) =>  (a.provincia.nombre > b.provincia.nombre)-(a.provincia.nombre < b.provincia.nombre)
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      align:'center',
      key: 'fecha_registro',
      width: '14.285714285714285714285714285714%',
      sorter: (a, b) => a.fecha_registro - b.fecha_registro
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      width: '14.285714285714285714285714285714%',
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
      return this.id_entidad;
    }
    class_name() {
        return 'Entidad'
      }
  

   }

