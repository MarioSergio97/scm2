/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:13.285714285714285714285714285714 GMT-05:00 2020  
*@time Mon Dec 28 11:12:13.285714285714285714285714285714 GMT-05:00 2020  
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

  const url = 'gestion/interrelacion';

    export default class Interrelacion extends BaseModel {

       id_interrelacion
       procesamiento
       rendimiento
       equivalencia
       perdida
       perdida_final
       id_proceso
       proceso
       general

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_interrelacion = attributes.id_interrelacion|| undefined
        this.procesamiento = attributes.procesamiento|| ''
        this.rendimiento = attributes.rendimiento|| ''
        this.equivalencia = attributes.equivalencia|| ''
        this.perdida = attributes.perdida|| ''
        this.perdida_final = attributes.perdida_final|| ''
        this.id_proceso = attributes.id_proceso|| ''
        this.proceso =   attributes.proceso|| ''
        this.general = attributes.general|| ''
        this.calcularGeneral()
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_interrelacion = attributes.id_interrelacion
        this.procesamiento = attributes.procesamiento
        this.rendimiento = attributes.rendimiento
        this.equivalencia = attributes.equivalencia
        this.perdida = attributes.perdida
        this.perdida_final = attributes.perdida_final
        this.id_proceso = attributes.id_proceso
        this.proceso =   attributes.proceso
        this.general = attributes.general
        this.calcularGeneral()
      }
    }

    static validations = {
      interrelacion: {
        procesamiento: {
          required,
          decimal,
        },
        rendimiento: {
          required,
          decimal,
        },
        equivalencia: {
          required,
          decimal,
        },
        perdida: {
          required,
          decimal,
        },
        perdida_final: {
          required,
          decimal,
        },
        id_proceso: {
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_interrelacion,id_proceso}=object
          const params={id_interrelacion,id_proceso}
          const _scenario=id_interrelacion?'update':'create'
          const validation= await Interrelacion.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        }, 
          required,
          integer,
        },
        general: {
          decimal,
        },
      },
    }

    static feedbacks = {
      interrelacion: {
      id_interrelacion: {
        isUnique: 'This id_interrelacion has been taken' 
      },
      id_proceso: {
        isUnique: 'Ya este proceso tiene asociada su interrelación' 
      },
      },
    }

  // static columns = [
  //   {
  //       title: 'Proceso',
  //       dataIndex: 'proceso.nombre',
  //       align:'center',
  //       key: 'proceso.nombre',
  //       width: '13.285714285714285714285714285714%',
  //       sorter: (a, b) =>  (a.proceso.nombre > b.proceso.nombre)-(a.proceso.nombre < b.proceso.nombre)
  //   },
  //   {
  //     title: 'Procesamiento',
  //     dataIndex: 'procesamiento',
  //     align:'center',
  //     key: 'procesamiento',
  //     width: '13.285714285714285714285714285714%',
  //   },
  //   {
  //     title: 'Rendimiento',
  //     dataIndex: 'rendimiento',
  //     align:'center',
  //     key: 'rendimiento',
  //     width: '13.285714285714285714285714285714%',
  //   },
  //   {
  //     title: 'Equivalencia',
  //     dataIndex: 'equivalencia',
  //     align:'center',
  //     key: 'equivalencia',
  //     width: '13.285714285714285714285714285714%',
  //   },
  //   {
  //     title: 'Perdida',
  //     dataIndex: 'perdida',
  //     align:'center',
  //     key: 'perdida',
  //     width: '13.285714285714285714285714285714%',
  //   },
  //   {
  //     title: 'Perdida_final',
  //     dataIndex: 'perdida_final',
  //     align:'center',
  //     key: 'perdida_final',
  //     width: '13.285714285714285714285714285714%',
  //   },
  //   {
  //       title: 'General',
  //       dataIndex: 'general',
  //       align:'center',
  //       key: 'general',
  //       width: '10%',
  //   },
  //   {
  //     title: 'Acciones',
  //     key: 'action_elements',
  //     fixed: 'right',
  //     width: '13.285714285714285714285714285714%',
  //     scopedSlots: {
  //       customRender: 'action'
  //     }
  //   }
  // ];

    calcularGeneral(){
       var temp = this.rendimiento * this.equivalencia / (1-this.perdida_final);
       this.general = this.round(temp,4);
    };

     round(num, decimales = 2) {
        var signo = (num >= 0 ? 1 : -1);
        num = num * signo;
        if (decimales === 0) //con 0 decimales
            return signo * Math.round(num);
        // round(x * 10 ^ decimales)
        num = num.toString().split('e');
        num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
        // x * 10 ^ (-decimales)
        num = num.toString().split('e');
        return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
    }

    static crearColumnas(esGestor){

        var columnas = [
            {
                title: 'Proceso',
                dataIndex: 'proceso.nombre',
                align:'center',
                key: 'proceso.nombre',
                width: '13.285714285714285714285714285714%',
                sorter: (a, b) =>  (a.proceso.nombre > b.proceso.nombre)-(a.proceso.nombre < b.proceso.nombre)
            },
            {
                title: 'Procesamiento',
                dataIndex: 'procesamiento',
                align:'center',
                key: 'procesamiento',
                width: '13.285714285714285714285714285714%',
            },
            {
                title: 'Rendimiento',
                dataIndex: 'rendimiento',
                align:'center',
                key: 'rendimiento',
                width: '13.285714285714285714285714285714%',
            },
            {
                title: 'Equivalencia',
                dataIndex: 'equivalencia',
                align:'center',
                key: 'equivalencia',
                width: '13.285714285714285714285714285714%',
            },
            {
                title: 'Pérdida',
                dataIndex: 'perdida',
                align:'center',
                key: 'perdida',
                width: '13.285714285714285714285714285714%',
            },
            {
                title: 'Pérdida final',
                dataIndex: 'perdida_final',
                align:'center',
                key: 'perdida_final',
                width: '13.285714285714285714285714285714%',
            },
            {
                title: 'General',
                dataIndex: 'general',
                align:'center',
                key: 'general',
                width: '13.285714285714285714285714285714%',
            },

        ];

        if(esGestor){
            columnas[7] = {

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
      return this.id_interrelacion;
    }
    class_name() {
        return 'Interrelacion'
      }
  

   }

