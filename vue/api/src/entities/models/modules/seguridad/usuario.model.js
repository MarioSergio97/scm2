/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:15 GMT-05:00 14.28571428571428571428571428571414.285714285714285714285714285714  
*@time Mon Dec 28 11:12:15 GMT-05:00 14.28571428571428571428571428571414.285714285714285714285714285714  
*/
import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal,
    email as email_valid,
    // passwordLength as cont,
    // name as username_exists,
    // email as email_exists,

  } from 'vuelidate/lib/validators';

  import BaseModel from '../../base.model';

  const url = 'seguridad/usuario';

    export default class Usuario extends BaseModel {

       id_usuario
       nombre
       email
       contrasenna
       telefono
       cargo_empresa
       id_entidad
       authkey
       id_rol
       perfil

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_usuario = attributes.id_usuario|| undefined
        this.nombre = attributes.nombre|| ''
        this.email = attributes != null ? attributes.email || '' : ''
        this.contrasenna = attributes.contrasenna|| ''
        this.telefono = attributes.telefono|| ''
        this.cargo_empresa = attributes.cargo_empresa|| ''
        this.id_entidad = attributes.id_entidad|| ''
        this.authkey = attributes.authkey|| ''
        this.id_rol = attributes.id_rol|| ''
        this.perfil = attributes.perfil|| false
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_usuario = attributes.id_usuario
        this.nombre = attributes.nombre
        this.email = attributes.email
        this.contrasenna = attributes.contrasenna
        this.telefono = attributes.telefono
        this.cargo_empresa = attributes.cargo_empresa
        this.id_entidad = attributes.id_entidad
        this.authkey = attributes.authkey
        this.id_rol = attributes.id_rol
        this.perfil = attributes.perfil
      }
    }

    static validations = {
      usuario: {

        nombre: {     
        // username_exists,
      // async isUnique(value,object) {
      //     if(!value)
      //       return true
      //     const _specific=true
      //     const {id_usuario,nombre}=object
      //     const params={object}
      //     const _scenario=id_usuario?'Añadir Usuario':'Actualizar Usuario'
      //     const validation=  Usuario.validate({...params,_specific,_scenario})
      //     return !validation.data?false:validation.data.success
      //   },
        required,
        maxLength: maxLength(45),
        // username_exists,
        },
        email: {
        email_valid,
        async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_usuario,email}=object;
          const params={id_usuario,email}
          const _scenario=id_usuario?'update':'create'
          const validation= await Usuario.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        },
        required,
        maxLength: maxLength(45),
        // email_exist
        },
        contrasenna: {
          minLength: minLength(8),
          maxLength: maxLength(20),
          required,
          // sameAsPassword: sameAs('password')
        },
        telefono: {
           integer,
           minLength: minLength(8),
           maxLength: maxLength(10),           
        },
        cargo_empresa: {
          maxLength: maxLength(45),
        },
        id_entidad: {         
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_usuario,id_entidad}=object;
          const params={id_usuario,id_entidad}
          const _scenario=id_usuario?'update':'create'
          const validation= await Usuario.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        },
        required,
        integer,
        },
        authkey: {
          integer,
          // maxLength: maxLength(255)
        },
        id_rol: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      usuario: {
      id_usuario: {
        isUnique: 'This id_usuario has been taken' 
      },
      email: {
        isUnique: 'Ya existe un usuario con este correo'
      },
      id_entidad: {
        isUnique: 'Ya existe un usuario asociado a esta entidad'
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
      // sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      align:'center',
      key: 'email',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.email > b.email)-(a.email < b.email)
    },
    // {
    //   title: 'Contrasenna',
    //   dataIndex: 'contrasenna',
    //   align:'center',
    //   key: 'contrasenna',
    //   width: '14.285714285714285714285714285714%',
    //   sorter: (a, b) =>  (a.contrasenna > b.contrasenna)-(a.contrasenna < b.contrasenna)
    // },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      align:'center',
      key: 'telefono',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.telefono > b.telefono)-(a.telefono < b.telefono)
    },
    {
      title: 'Cargo de empresa',
      dataIndex: 'cargo_empresa',
      align:'center',
      key: 'cargo_empresa',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.cargo_empresa > b.cargo_empresa)-(a.cargo_empresa < b.cargo_empresa)
    },
    {
      title: 'Entidad',
      dataIndex: 'entidad.nombre',
      align:'center',
      key: 'entidad.nombre',
      width: '14.285714285714285714285714285714%',
      // sorter: (a, b) =>  (a.entidad.nombre > b.entidad.nombre)-(a.entidad.nombre < b.entidad.nombre)
    },
    // {
    //   title: 'Authkey',
    //   dataIndex: 'authkey',
    //   align:'center',
    //   key: 'authkey',
    //   width: '14.285714285714285714285714285714%',
    //   sorter: (a, b) => a.authkey - b.authkey
    // },
    {
      title: 'Rol',
      dataIndex: 'rol.role',
      align:'center',
      key: 'rol.role',
      width: '14.285714285714285714285714285714%',
      sorter: (a, b) =>  (a.rol.role > b.rol.role)-(a.rol.role < b.rol.role)
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'center',
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
      return this.id_usuario;
    }
    class_name() {
        return 'Usuario'
      }
  

   }

