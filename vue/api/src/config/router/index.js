import Vue from 'vue'
import Router from 'vue-router'
import index from '../../components/layout/Home'
import login from '../../components/layout/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    hash: false,
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            props: {page: 1}
        },
        {
             path: '*',
             redirect: '/'
         },
        {
            path: '/',
            name: 'login',
            component: login,
            props: {page:1}
        },
       {
            path: '/nomencladores/pais_list',
            name: 'pais_list',
            component: require('../../components/views/nomencladores/pais/list/pais_list').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/pais_form',
            name: 'pais_form',
            component: require('../../components/views/nomencladores/pais/form/pais_form').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/provincia_list',
            name: 'provincia_list',
            component: require('../../components/views/nomencladores/provincia/list/provincia_list').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/provincia_form',
            name: 'provincia_form',
            component: require('../../components/views/nomencladores/provincia/form/provincia_form').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/tipo_proceso_list',
            name: 'tipo_proceso_list',
            component: require('../../components/views/nomencladores/tipo_proceso/list/tipo_proceso_list').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/tipo_proceso_form',
            name: 'tipo_proceso_form',
            component: require('../../components/views/nomencladores/tipo_proceso/form/tipo_proceso_form').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/unidad_medida_list',
            name: 'unidad_medida_list',
            component: require('../../components/views/nomencladores/unidad_medida/list/unidad_medida_list').default,
            props: {page: 1}
        },
       {
            path: '/nomencladores/unidad_medida_form',
            name: 'unidad_medida_form',
            component: require('../../components/views/nomencladores/unidad_medida/form/unidad_medida_form').default,
            props: {page: 1}
        },
       {
            path: '/seguridad/rol_list',
            name: 'rol_list',
            component: require('../../components/views/seguridad/rol/list/rol_list').default,
            props: {page: 1}
        },
       {
            path: '/seguridad/rol_form',
            name: 'rol_form',
            component: require('../../components/views/seguridad/rol/form/rol_form').default,
            props: {page: 1}
        },
       {
            path: '/seguridad/usuario_list',
            name: 'usuario_list',
            component: require('../../components/views/seguridad/usuario/list/usuario_list').default,
            props: {page: 1}
        },
       {
            path: '/seguridad/usuario_form',
            name: 'usuario_form',
            component: require('../../components/views/seguridad/usuario/form/usuario_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/capacidad_list',
            name: 'capacidad_list',
            component: require('../../components/views/gestion/capacidad/normal/list/capacidad_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/capacidad_form',
            name: 'capacidad_form',
            component: require('../../components/views/gestion/capacidad/normal/form/capacidad_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/entidad_list',
            name: 'entidad_list',
            component: require('../../components/views/gestion/entidad/list/entidad_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/entidad_form',
            name: 'entidad_form',
            component: require('../../components/views/gestion/entidad/form/entidad_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/interrelacion_list',
            name: 'interrelacion_list',
            component: require('../../components/views/gestion/interrelacion/list/interrelacion_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/interrelacion_form',
            name: 'interrelacion_form',
            component: require('../../components/views/gestion/interrelacion/form/interrelacion_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/parametro_capacidad_list',
            name: 'parametro_capacidad_list',
            component: require('../../components/views/gestion/parametro_capacidad/list/parametro_capacidad_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/parametro_capacidad_form',
            name: 'parametro_capacidad_form',
            component: require('../../components/views/gestion/parametro_capacidad/form/parametro_capacidad_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/proceso_list',
            name: 'proceso_list',
            component: require('../../components/views/gestion/proceso/list/proceso_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/proceso_form',
            name: 'proceso_form',
            component: require('../../components/views/gestion/proceso/form/proceso_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/reporte_list',
            name: 'reporte_list',
            component: require('../../components/views/gestion/reporte/list/reporte_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/reporte_form',
            name: 'reporte_form',
            component: require('../../components/views/gestion/reporte/form/reporte_form').default,
            props: {page: 1}
        },
       {
            path: '/gestion/scm_list',
            name: 'scm_list',
            component: require('../../components/views/gestion/scm/list/scm_list').default,
            props: {page: 1}
        },
       {
            path: '/gestion/scm_form',
            name: 'scm_form',
            component: require('../../components/views/gestion/scm/form/scm_form').default,
            props: {page: 1}
        },
       {
            path: '/produccion/demanda_list',
            name: 'demanda_list',
            component: require('../../components/views/produccion/demanda/list/demanda_list').default,
            props: {page: 1}
        },
       {
            path: '/produccion/demanda_form',
            name: 'demanda_form',
            component: require('../../components/views/produccion/demanda/form/demanda_form').default,
            props: {page: 1}
        },
       {
            path: '/produccion/producto_list',
            name: 'producto_list',
            component: require('../../components/views/produccion/producto/list/producto_list').default,
            props: {page: 1}
        },
       {
            path: '/produccion/producto_form',
            name: 'producto_form',
            component: require('../../components/views/produccion/producto/form/producto_form').default,
            props: {page: 1}
        },
       {
            path: '/produccion/incidencia_list',
            name: 'incidencia_list',
            component: require('../../components/views/produccion/incidencia/list/incidencia_list').default,
            props: {page: 1}
        },
       {
            path: '/produccion/incidencia_form',
            name: 'incidencia_form',
            component: require('../../components/views/produccion/incidencia/form/incidencia_form').default,
            props: {page: 1}
        },

        // *****************************************Nuevas **************************************************

        {
            path: '/produccion/control_programa_lanzamiento_list',
            name: 'control_list',
            component: require('../../components/views/produccion/control_programa_lanzamiento/list/control_programa_lanzamiento_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/control_programa_entrega_list',
            name: 'control_list',
            component: require('../../components/views/produccion/control_programa_entrega/list/control_programa_entrega_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/programa_lanzamiento_list',
            name: 'programa_lanzamiento_list',
            component: require('../../components/views/produccion/programa_lanzamiento/list/programa_lanzamiento_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/programa_lanzamiento_ajustado_list',
            name: 'programa_lanzamiento_ajustado_list',
            component: require('../../components/views/produccion/programa_lanzamiento_ajustado/list/programa_lanzamiento_ajustado_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/programa_produccion_list',
            name: 'programa_produccion_list',
            component: require('../../components/views/produccion/programa_produccion/list/programa_produccion_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/programa_entrega_list',
            name: 'programa_entrega_list',
            component: require('../../components/views/produccion/programa_entrega/list/programa_entrega_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/inventario_list',
            name: 'inventario_list',
            component: require('../../components/views/produccion/inventario/list/inventario_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/inventario_ajustado_list',
            name: 'inventario_ajustado_list',
            component: require('../../components/views/produccion/inventario_ajustado/list/inventario_ajustado_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/costo_list',
            name: 'costo_list',
            component: require('../../components/views/produccion/costo/list/costo_list').default,
            props: {page: 1}
        },
        {
            path: '/gestion/proceso_normal_list',
            name: 'proceso_normal_list',
            component: require('../../components/views/gestion/proceso_normal/list/proceso_normal_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/utilizacion_list',
            name: 'utilizacion_list',
            component: require('../../components/views/produccion/utilizacion/list/utilizacion_list').default,
            props: {page: 1}
        },
        {
            path: '/produccion/programa_entrega_ajustada_list',
            name: 'programa_entrega_ajustada_list',
            component: require('../../components/views/produccion/programa_entrega_ajustada/list/programa_entrega_ajustada_list').default,
            props: {page: 1}
        },
        {
            path: '/gestion/parametro_capacidad_list',
            name: 'parametro_capacidad_list',
            component: require('../../components/views/gestion/parametro_capacidad/list/parametro_capacidad_list').default,
            props: {page: 1}
        },
        {
            path: '/gestion/capacidad_proceso_list',
            name: 'capacidad_proceso_list',
            component: require('../../components/views/gestion/capacidad/capacidad_proceso/list/capacidad_proceso_list').default,
            props: {page: 1}
        },
        {
            path: '/gestion/capacidad',
            name: 'capacidad',
            component: require('../../components/views/gestion/capacidad/capacidad').default,
            props: {page: 1}
        },
        {
            path: '/reportes/registro_list',
            name: 'registro',
            component: require('../../components/views/reportes/registro/list/registro_list').default,
            props: {page: 1}
        },
    ]
})

