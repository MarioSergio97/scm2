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

  const url = 'seguridad/rol';

    export default class Rol extends BaseModel {

       id_rol
       role

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_rol = attributes.id_rol|| undefined
        this.role = attributes.role|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_rol = attributes.id_rol
        this.role = attributes.role
      }
    }

    static validations = {
      rol: {
        role: {
          required,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_rol,role}=object
               const _scenario=id_rol?'update':'create'
               const params={id_rol,role}
               const validation= await Rol.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      rol: {
      id_rol: {
        isUnique: 'This id_rol has been taken' 

      },
      role: {
        isUnique: 'This role has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      align:'center',
      key: 'role',
      width: '20%',
      sorter: (a, b) =>  (a.role > b.role)-(a.role < b.role)
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
      return this.id_rol;
    }
    class_name() {
        return 'Rol'
      }
  

   }

