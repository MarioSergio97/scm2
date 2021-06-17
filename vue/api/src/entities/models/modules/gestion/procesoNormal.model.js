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
    id_scm
    id_tipo_proceso
    id_entidad
    entidad
    id_producto
    fecha_registro
    tipo_proceso
    producto

    constructor(attributes = null) {
        super();
        if (attributes != null) {

            this.id_proceso = attributes.id_proceso|| undefined
            this.numero = attributes.numero|| ''
            this.nombre = attributes.nombre|| ''
            this.descripcion = attributes.descripcion|| ''
            this.id_scm = attributes.id_scm|| ''
            this.id_tipo_proceso = attributes.id_tipo_proceso|| ''
            this.id_entidad = attributes.id_entidad|| ''
            this.entidad = attributes.entidad|| ''
            this.id_producto = attributes.id_producto|| ''
            // this.fecha_registro = attributes.fecha_registro?moment(attributes.fecha_registro):null
            this.fecha_registro = attributes.fecha_registro|| ''
            this.tipo_proceso = attributes.tipo_proceso|| ''
            this.producto = attributes.producto|| ''
        }
    }

    set_attributes(attributes = null) {
        if (attributes != null) {

            this.id_proceso = attributes.id_proceso
            this.numero = attributes.numero
            this.nombre = attributes.nombre
            this.descripcion = attributes.descripcion
            this.id_scm = attributes.id_scm
            this.id_tipo_proceso = attributes.id_tipo_proceso
            this.id_entidad = attributes.id_entidad
            this.entidad = attributes.entidad
            this.id_producto = attributes.id_producto
            // this.fecha_registro = moment(attributes.fecha_registro)
            this.fecha_registro = attributes.fecha_registro
            this.tipo_proceso = attributes.tipo_proceso
            this.producto = attributes.producto
        }
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
            width: '14.285714285714285714285714285714%',
            sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            align:'center',
            key: 'descripcion',
            width: '14.285714285714285714285714285714%',
            sorter: (a, b) =>  (a.descripcion > b.descripcion)-(a.descripcion < b.descripcion)
        },
        {
          title: 'Tipo de proceso',
          dataIndex: 'tipo_proceso.nombre',
          align:'center',
          key: 'tipo_proceso.nombre',
          width: '14.285714285714285714285714285714%',
          sorter: (a, b) =>  (a.tipo_proceso.nombre > b.tipo_proceso.nombre)-(a.tipo_proceso.nombre < b.tipo_proceso.nombre)
        },
        {
            title: 'Entidad',
            dataIndex: 'entidad.nombre',
            align:'center',
            key: 'entidad.nombre',
            width: '14.285714285714285714285714285714%',
            sorter: (a, b) =>  (a.entidad.nombre > b.entidad.nombre)-(a.entidad.nombre < b.entidad.nombre)
        },
        {
          title: 'Producto',
          dataIndex: 'producto.nombre',
          align:'center',
          key: 'producto.nombre',
          width: '14.285714285714285714285714285714%',
          sorter: (a, b) =>  (a.producto.nombre > b.producto.nombre)-(a.producto.nombre < b.producto.nombre)
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
            align:'center',
            width: '14.285714285714285714285714285714%',
            scopedSlots: {
                customRender: 'action'
            }
        }
    ];

}

