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

  const url = 'gestion/capacidadProcesos';

    export default class CapacidadProcesos extends BaseModel {

       id_capacidad
       id_proceso
       parametros
       proceso

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_capacidad = attributes.id_capacidad|| undefined
        this.id_proceso = attributes.id_proceso|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_capacidad = attributes.id_capacidad
        this.id_proceso = attributes.id_proceso
      }
    }

    static validations = {
      capacidad: {
        id_proceso: {
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_capacidad,id_proceso}=object
          const params={id_capacidad,id_proceso}
          const _scenario=id_capacidad?'update':'create'
          const validation= await CapacidadProcesos.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        },
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      capacidad: {
      id_capacidad: {
        isUnique: 'This id_capacidad has been taken' 
      },
      id_proceso: {
        isUnique: 'Ya este proceso tiene asociado una capacidad' 
      },
      },
    }

  setParametros(parametros){
       this.parametros = parametros;
  }

  setProceso(proceso){
         this.proceso = proceso;
  }
  static crearColumnas(listaParametros){

    // var cont=2;

    var columnas = [
        {
            title: 'Proceso',
            dataIndex: 'proceso',
            align:'center',
            key: 'proceso',
            width: '20%',
        },
    ];

    for(var i=0; i<listaParametros.length; i++){
        columnas[i+1]={
            title: listaParametros[i].nombre,
            dataIndex: 'parametros['+i+']',
            align:'center',
            key: 'parametros['+i+']',
            width: '20%',
        } ;
        // cont=i+3;
    };

    // columnas[cont+1]= {
    //     title: 'Acciones',
    //     key: 'action_elements',
    //     fixed: 'right',
    //     width: '15%',
    //     scopedSlots: {
    //         customRender: 'action'
    //     }
    // };

    return columnas;
};

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_capacidad;
    }
    class_name() {
        return 'CapacidadProcesos'
      }
  

   }

