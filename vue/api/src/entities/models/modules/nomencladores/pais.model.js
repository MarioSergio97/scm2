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

  const url = 'nomencladores/pais';

    export default class Pais extends BaseModel {

       id_pais
       nombre
       iso2
       iso3
       prefijo
       continente
       subcontinente
       iso_moneda
       nombre_moneda

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_pais = attributes.id_pais|| undefined
        this.nombre = attributes.nombre|| ''
        this.iso2 = attributes.iso2|| ''
        this.iso3 = attributes.iso3|| ''
        this.prefijo = attributes.prefijo|| ''
        this.continente = attributes.continente|| ''
        this.subcontinente = attributes.subcontinente|| ''
        this.iso_moneda = attributes.iso_moneda|| ''
        this.nombre_moneda = attributes.nombre_moneda|| ''
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_pais = attributes.id_pais
        this.nombre = attributes.nombre
        this.iso2 = attributes.iso2
        this.iso3 = attributes.iso3
        this.prefijo = attributes.prefijo
        this.continente = attributes.continente
        this.subcontinente = attributes.subcontinente
        this.iso_moneda = attributes.iso_moneda
        this.nombre_moneda = attributes.nombre_moneda
      }
    }

    static validations = {
      pais: {
        nombre: {
          required,
        },
        iso2: {
          required,
        },
        iso3: {
          required,
        },
        prefijo: {
          required,
        },
        continente: {
        },
        subcontinente: {
        },
        iso_moneda: {
        },
        nombre_moneda: {
        },
      },
    }

    static feedbacks = {
      pais: {
      id_pais: {
        isUnique: 'This id_pais has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      align:'center',
      key: 'nombre',
      width: '20%',
      sorter: (a, b) =>  (a.nombre > b.nombre)-(a.nombre < b.nombre)
    },
    {
      title: 'Iso2',
      dataIndex: 'iso2',
      align:'center',
      key: 'iso2',
      width: '20%',
      sorter: (a, b) =>  (a.iso2 > b.iso2)-(a.iso2 < b.iso2)
    },
    {
      title: 'Iso3',
      dataIndex: 'iso3',
      align:'center',
      key: 'iso3',
      width: '20%',
      sorter: (a, b) =>  (a.iso3 > b.iso3)-(a.iso3 < b.iso3)
    },
    {
      title: 'Prefijo',
      dataIndex: 'prefijo',
      align:'center',
      key: 'prefijo',
      width: '20%',
      sorter: (a, b) =>  (a.prefijo > b.prefijo)-(a.prefijo < b.prefijo)
    },
    {
      title: 'Continente',
      dataIndex: 'continente',
      align:'center',
      key: 'continente',
      width: '20%',
      sorter: (a, b) =>  (a.continente > b.continente)-(a.continente < b.continente)
    },
    {
      title: 'Subcontinente',
      dataIndex: 'subcontinente',
      align:'center',
      key: 'subcontinente',
      width: '20%',
      sorter: (a, b) =>  (a.subcontinente > b.subcontinente)-(a.subcontinente < b.subcontinente)
    },
    {
      title: 'Iso_moneda',
      dataIndex: 'iso_moneda',
      align:'center',
      key: 'iso_moneda',
      width: '20%',
      sorter: (a, b) =>  (a.iso_moneda > b.iso_moneda)-(a.iso_moneda < b.iso_moneda)
    },
    {
      title: 'Nombre_moneda',
      dataIndex: 'nombre_moneda',
      align:'center',
      key: 'nombre_moneda',
      width: '20%',
      sorter: (a, b) =>  (a.nombre_moneda > b.nombre_moneda)-(a.nombre_moneda < b.nombre_moneda)
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
      return this.id_pais;
    }
    class_name() {
        return 'Pais'
      }
  

   }

