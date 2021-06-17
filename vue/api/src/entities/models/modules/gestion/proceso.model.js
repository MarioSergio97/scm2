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

  const url = 'gestion/proceso';

    export default class Proceso extends BaseModel {

       id_proceso
       numero
       nombre
       descripcion
       costo_proceso
       costo_gestion
       costo_inventario
       porciento_demanda_total
       capacidad
       ciclo_proceso
       procesos_sucesores
       it_lanzamiento
       porciento_satisfaccion
       id_scm
       id_tipo_proceso
       id_entidad
       entidad
       id_producto
       fecha_registro
       indice_actividad
       lt_entrega



    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_proceso = attributes.id_proceso|| undefined
        this.numero = attributes.numero|| ''
        this.nombre = attributes.nombre|| ''
        this.descripcion = attributes.descripcion|| ''
        this.costo_proceso = attributes.costo_proceso|| ''
        this.costo_gestion = attributes.costo_gestion|| ''
        this.costo_inventario = attributes.costo_inventario|| ''
        this.porciento_demanda_total = attributes.porciento_demanda_total|| ''
        this.capacidad = attributes.capacidad|| ''
        this.ciclo_proceso = attributes.ciclo_proceso|| ''
        this.procesos_sucesores = attributes.procesos_sucesores|| ''
        this.it_lanzamiento = attributes.it_lanzamiento|| ''
        this.porciento_satisfaccion = attributes.porciento_satisfaccion|| ''
        this.id_scm = attributes.id_scm|| ''
        this.id_tipo_proceso = attributes.id_tipo_proceso|| ''
        this.id_entidad = attributes.id_entidad|| ''
        this.entidad = attributes.entidad|| ''
        this.id_producto = attributes.id_producto|| ''
        // this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null
        this.fecha_registro = attributes.fecha_registro|| ''
        this.indice_actividad = ''
        this.lt_entrega = ''
        this.calcularLTEntrega()
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_proceso = attributes.id_proceso
        this.numero = attributes.numero
        this.nombre = attributes.nombre
        this.descripcion = attributes.descripcion
        this.costo_proceso = attributes.costo_proceso
        this.costo_gestion = attributes.costo_gestion
        this.costo_inventario = attributes.costo_inventario
        this.porciento_demanda_total = attributes.porciento_demanda_total
        this.capacidad = attributes.capacidad
        this.ciclo_proceso = attributes.ciclo_proceso
        this.procesos_sucesores = attributes.procesos_sucesores
        this.it_lanzamiento = attributes.it_lanzamiento
        this.porciento_satisfaccion = attributes.porciento_satisfaccion
        this.id_scm = attributes.id_scm
        this.id_tipo_proceso = attributes.id_tipo_proceso
        this.id_entidad = attributes.id_entidad
        this.entidad = attributes.entidad
        this.id_producto = attributes.id_producto
        // this.fecha_registro = moment(attributes.fecha_registro)
        this.fecha_registro = attributes.fecha_registro
        this.indice_actividad = ''
        this.lt_entrega = ''
        this.calcularLTEntrega()
      }
    }

    static validations = {
      proceso: {
        numero: {
          required,
          integer,
        },
        nombre: {
          required,
          async isUnique(value,object) {
          if(!value)
            return true
          const _specific=true
          const {id_proceso,nombre,id_scm}=object;
          const params={id_proceso,nombre,id_scm}
          const _scenario=id_proceso?'create':'update'
          const validation= await Proceso.validate({...params,_specific,_scenario})
          return !validation.data?false:validation.data.success
        },
        maxLength: maxLength(45)
        },
        descripcion: {
          required,
          maxLength: maxLength(65535),
        },
        costo_proceso: {
          decimal,
        },
        costo_gestion: {
          decimal,
        },
        costo_inventario: {
          decimal,
        },
        porciento_demanda_total: {
          decimal,
        },
        capacidad: {
          decimal,
        },
        ciclo_proceso: {
          integer,
        },
        procesos_sucesores: {
          integer,
        },
        it_lanzamiento: {
          decimal,
        },
        porciento_satisfaccion: {
          decimal,
        },
        id_scm: {
          required,
          integer,
        },
        id_tipo_proceso: {
          required,
          integer,
        },
        id_entidad: {
          required,
          integer,
        },
        id_producto: {
          required,
          integer,
        },
        fecha_registro: {
          required,
        },
        indice_actividad: {
            decimal,
        },
        lt_entrega: {
            decimal,
        },
      },
    }

    static feedbacks = {
      proceso: {
      id_proceso: {
        isUnique: 'This id_proceso has been taken' 

      },
      nombre: {
        isUnique: 'Ya existe un proceso con este nombre en esta cadena de suministro'
      },
      },
    }

  static columns = [
    // {
    //   title: 'Numero',
    //   dataIndex: 'numero',
    //   align:'center',
    //   key: 'numero',
    //   width: '20%',
    //   sorter: (a, b) => a.numero - b.numero
    // },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '10%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      align:'center',
      key: 'descripcion',
      width: '10%',
      // sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
    },
    {
      title: 'Costo del proceso',
      dataIndex: 'costo_proceso',
      align:'center',
      key: 'costo_proceso',
      width: '6.6428571428571428571428571428571%',
    },
    {
      title: 'Costo de gestión',
      dataIndex: 'costo_gestion',
      align:'center',
      key: 'costo_gestion',
      width: '6.6428571428571428571428571428571%',
    },
    {
      title: 'Costo de inventario',
      dataIndex: 'costo_inventario',
      align:'center',
      key: 'costo_inventario',
      width: '6.6428571428571428571428571428571%',
    },
    {
      title: 'Porciento de la demanda total',
      dataIndex: 'porciento_demanda_total',
      align:'center',
      key: 'porciento_demanda_total',
      width: '6.6428571428571428571428571428571%',
    },
    {
        title: 'Indice de Actividad',
        dataIndex: 'indice_actividad',
        align:'center',
        key: 'indice_actividad',
        width: '6.6428571428571428571428571428571%',
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacidad',
      align:'center',
      key: 'capacidad',
      width: '6.6428571428571428571428571428571%',
    },
    {
      title: 'Ciclo del proceso',
      dataIndex: 'ciclo_proceso',
      align:'center',
      key: 'ciclo_proceso',
      width: '6.6428571428571428571428571428571%',
      // sorter: (a, b) => a.ciclo_proceso - b.ciclo_proceso
    },
    // {
    //   title: 'Procesos_sucesores',
    //   dataIndex: 'procesos_sucesores',
    //   align:'center',
    //   key: 'procesos_sucesores',
    //   width: '20%',
    //   sorter: (a, b) => a.procesos_sucesores - b.procesos_sucesores
    // },
    {
      title: 'Lead time de lanzamiento',
      dataIndex: 'it_lanzamiento',
      align:'center',
      key: 'it_lanzamiento',
      width: '6.6428571428571428571428571428571%',
    },
    {
        title: 'Lead time de entrega',
        dataIndex: 'lt_entrega',
        align:'center',
        key: 'lt_entrega',
        width: '6.6428571428571428571428571428571%',
    },
    // {
    //   title: 'Porciento de satisfaccion',
    //   dataIndex: 'porciento_satisfaccion',
    //   align:'center',
    //   key: 'porciento_satisfaccion',
    //   width: '6%',
    // },
    // {
    //   title: 'Scm',
    //   dataIndex: 'scm.nombre',
    //   align:'center',
    //   key: 'scm.nombre',
    //   width: '20%',
    //   sorter: (a, b) =>  (a.scm.nombre > b.scm.nombre)-(a.scm.nombre < b.scm.nombre)
    // },
    // {
    //   title: 'Tipo_proceso',
    //   dataIndex: 'tipo_proceso.nombre',
    //   align:'center',
    //   key: 'tipo_proceso.nombre',
    //   width: '20%',
    //   sorter: (a, b) =>  (a.tipo_proceso.nombre > b.tipo_proceso.nombre)-(a.tipo_proceso.nombre < b.tipo_proceso.nombre)
    // },
    {
      title: 'Entidad',
      dataIndex: 'entidad.nombre',
      align:'center',
      key: 'entidad.nombre',
      width: '6.6428571428571428571428571428571%',
      // sorter: (a, b) =>  (a.entidad.nombre > b.entidad.nombre)-(a.entidad.nombre < b.entidad.nombre)
    },
    // {
    //   title: 'Producto',
    //   dataIndex: 'producto.nombre',
    //   align:'center',
    //   key: 'producto.nombre',
    //   width: '20%',
    //   sorter: (a, b) =>  (a.producto.nombre > b.producto.nombre)-(a.producto.nombre < b.producto.nombre)
    // },
    {
      title: 'Fecha de registro',
      dataIndex: 'fecha_registro',
      align:'center',
      key: 'fecha_registro',
      width: '6.6428571428571428571428571428571%',
      sorter: (a, b) => a.fecha_registro - b.fecha_registro
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      // fixed: 'right',
      align:'center',
      width: '7%',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ];

   calcularLTEntrega(){
     var temp = this.it_lanzamiento - this.ciclo_proceso;
     this.lt_entrega = this.round(temp,3);
   }

   calcularIndiceActividad(general){
     var temp = general;
     this.indice_actividad = this.round(temp,3);
   }

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

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_proceso;
    }
    class_name() {
        return 'Proceso'
      }
  

   }

