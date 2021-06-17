/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:15 GMT-05:00 18.618.6  
*@time Mon Dec 28 11:12:15 GMT-05:00 18.618.6  
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

  const url = 'produccion/demanda';

    export default class Demanda extends BaseModel {

       id_demanda
       no_intervalo
       demanda_final
       demanda_agrupada
       fecha
       id_scm

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_demanda = attributes.id_demanda|| undefined
        this.no_intervalo = attributes.no_intervalo|| ''
        this.demanda_final = attributes.demanda_final|| ''
        this.demanda_agrupada = attributes.demanda_agrupada|| ''
        this.fecha = attributes.fecha?moment(attributes.fecha):null
        this.id_scm = attributes.id_scm|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_demanda = attributes.id_demanda
        this.no_intervalo = attributes.no_intervalo
        this.demanda_final = attributes.demanda_final
        this.demanda_agrupada = attributes.demanda_agrupada
        this.fecha = moment(attributes.fecha)
        this.id_scm = attributes.id_scm
      }
    }

    static validations = {
      demanda: {
        no_intervalo: {
          required,
          integer,
        },
        demanda_final: {
          required,
          decimal,
        },
        demanda_agrupada: {
          required,
          decimal,
        },
        fecha: {
          required,
        },
        id_scm: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      demanda: {
      id_demanda: {
        isUnique: 'This id_demanda has been taken' 

      },
      },
    }

  // static columns = [
  //   {
  //     title: 'No_intervalo',
  //     dataIndex: 'no_intervalo',
  //     align:'center',
  //     key: 'no_intervalo',
  //     width: '18.6%',
  //     sorter: (a, b) => a.no_intervalo - b.no_intervalo
  //   },
  //   {
  //     title: 'Demanda_final',
  //     dataIndex: 'demanda_final',
  //     align:'center',
  //     key: 'demanda_final',
  //     width: '18.6%',
  //   },
  //   {
  //     title: 'Demanda_agrupada',
  //     dataIndex: 'demanda_agrupada',
  //     align:'center',
  //     key: 'demanda_agrupada',
  //     width: '18.6%',
  //   },
  //   {
  //     title: 'Fecha',
  //     dataIndex: 'fecha',
  //     align:'center',
  //     key: 'fecha',
  //     width: '18.6%',
  //     sorter: (a, b) => a.fecha - b.fecha
  //   },
  //   {
  //     title: 'Scm',
  //     dataIndex: 'scm.nombre',
  //     align:'center',
  //     key: 'scm.nombre',
  //     width: '18.6%',
  //     sorter: (a, b) =>  (a.scm.nombre > b.scm.nombre)-(a.scm.nombre < b.scm.nombre)
  //   },
  //   {
  //     title: 'Acciones',
  //     key: 'action_elements',
  //     fixed: 'right',
  //     width: '15%',
  //     scopedSlots: {
  //       customRender: 'action'
  //     }
  //   }
  // ];

    static crearColumnas(esGestor){

        var columnas = [
            {
                title: 'No de intervalo',
                dataIndex: 'no_intervalo',
                align:'center',
                key: 'no_intervalo',
                width: '18.6%',
                sorter: (a, b) => a.no_intervalo - b.no_intervalo
            },
            {
                title: 'Demanda final',
                dataIndex: 'demanda_final',
                align:'center',
                key: 'demanda_final',
                width: '18.6%',
            },
            {
                title: 'Demanda agrupada',
                dataIndex: 'demanda_agrupada',
                align:'center',
                key: 'demanda_agrupada',
                width: '18.6%',
            },            
            {
                title: 'Scm',
                dataIndex: 'scm.nombre',
                align:'center',
                key: 'scm.nombre',
                width: '18.6%',
                sorter: (a, b) =>  (a.scm.nombre > b.scm.nombre)-(a.scm.nombre < b.scm.nombre)
            },
            {
                title: 'Fecha',
                dataIndex: 'fecha',
                align:'center',
                key: 'fecha',
                width: '18.6%',
                sorter: (a, b) => a.fecha - b.fecha
            },
        ];

        if(esGestor){
            columnas[5] = {

                title: 'Acciones',
                key: 'action_elements',
                // fixed: 'right',
                align:'center',
                width: '7%',
                scopedSlots: {
                    customRender: 'action'
                }
            };
        }
        return columnas;
    };

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_demanda;
    }
    class_name() {
        return 'Demanda'
      }
  

   }

