<template>
  <a-spin :spinning="loading">
    <div class="container">
      <div class="row">
        <h1>{{title}} </h1>
      </div>
      <div>
        <div class="row">
          <div class="col-md-2 my-2 my-md-0" v-if="visible_word_search">
            <label>{{search_title}}</label>
            <div class="d-flex flex-row mt-1">
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="filter_search"
                placeholder="Buscar"
                aria-label
              />
            </div>
          </div>
          <div class="col-md-2 my-2 my-md-0" v-if="visible_language">
            <label>Idioma</label>
            <div class="d-flex flex-row">
              <tc-autocomplete
                placeholder="Seleccione el Idioma"
                name="filter_language"
                ref="select_languages"
                :successFeed="false"
                id-key="iso"
                v-model="filter_language"
                :dataSource="languages"
              />
            </div>
          </div>
          <div class="col-md-2 my-2 my-md-0">
            <label>País</label>
            <div class="d-flex flex-row">
              <tc-autocomplete
                placeholder="Seleccione el País"
                name="filter_country"
                ref="select_country"
                :successFeed="false"
                @change="change_pais"
                v-model="filter_country"
                :url="mb.statics('Countries').select_2_url"
              />
            </div>
          </div>
          <div class="col-md-2 my-2 my-md-0">
            <label>Estado</label>
            <div class="d-flex flex-row">
              <tc-autocomplete
                placeholder="Seleccione el Estado"
                :search_params="select_country"
                name="filter_state"
                @change="change_state"
                ref="select_states"
                :successFeed="false"
                v-model="filter_state"
                :url="mb.statics('States').select_2_url"
              />
            </div>
          </div>
          <div class="col-md-2 my-2 my-md-0">
            <label>Ciudad</label>
            <div class="d-flex flex-row">
              <tc-autocomplete
                placeholder="Seleccione la ciudad"
                :search_params="select_state"
                @change="change_city"
                name="filter_city"
                ref="select_city"
                :successFeed="false"
                v-model="filter_city"
                :url="mb.statics('Cities').select_2_url"
              />
            </div>
          </div>
          <div class="col-md-2 my-2 my-md-0" v-if="visible_zone">
            <label>Zona</label>
            <div class="d-flex flex-row">
              <tc-autocomplete
                placeholder="Seleccione la zona"
                :search_params="select_city"
                name="filter_zone"
                ref="select_zone"
                :successFeed="false"
                v-model="filter_zone"
                :url="mb.statics('Zones').select_2_url"
              />
            </div>
          </div>
          <slot name="profiletype"/>
          <slot name="button_search"/>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script>
  import * as languages from '../../../assets/imports/idioma'
  import * as mb from '../../../entities/models'
  import * as utils from '../../../entities/utils/utils'

  export default {
    name: 'search_header',
    inject: {
      set_filters: {
        default: () => {
        }
      },
      load_data: {
        default: () => {
        }
      },
    },
    props: {
      visible_word_search: {
        type: Boolean,
        default: true
      },
      visible_language: {
        type: Boolean,
        default: true
      },
      visible_zone: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      search_title: {
        type: String,
        default: 'Buscar'
      },
    },
    data () {
      return {
        loading: false,
        filter_language: '',
        filter_country: '',
        filter_state: '',
        filter_city: '',
        filter_zone: '',
        filter_search: '',
        select_state: null,
        select_city: null,
        select_country: null,
        languages: languages.default,
        mb
      }
    },
    computed: {
      filters () {
        return {
          filter_search: this.filter_search,
          filter_language: this.filter_language,
          filter_city: this.filter_city,
          filter_country: this.filter_country,
          filter_state: this.filter_state,
          filter_zone: this.filter_zone
        }
      }
    },
    watch: {
      filter_search: function (newValue, oldvalue) {
        if (!newValue) {
          this.filter_city = null
          this.select_state = null
        }

        this.set_filters(this.filters)
      },
      filter_language: function (newValue, oldvalue) {
        if (!newValue) {
          this.filter_city = null
          this.select_state = null
        }

        this.set_filters(this.filters)
      },
      filter_state: function (newValue, oldvalue) {
        if (!newValue) {
          this.filter_city = null
          this.select_state = null
        }

        this.set_filters(this.filters)
      },
      filter_city: function (newValue, oldvalue) {
        if (!newValue) {
          this.filter_zone = null
          this.select_city = null
        }

        this.set_filters(this.filters)
      },
      filter_country: function (newValue, oldvalue) {
        if (!newValue) {
          this.filter_state = null
          this.select_country = null
        }

        this.set_filters(this.filters)
      },
      filter_zone: function (newValue, oldvalue) {
        this.set_filters(this.filters)
      },
    },
    methods: {
      set_value (parameter, value) {
        this[parameter] = value
      },
      reset () {
        this.filter_search = ''
        this.filter_language = ''
        this.filter_country = ''
        this.params = {}
        this.load_data()

      },
      find_search_zones () {
        const isvalidsearch = (this.filter_search || this.filter_country || this.filter_state || this.filter_city || this.filter_zone || this.filter_language) !== ''
        if (!isvalidsearch) {
          utils.openNotificationWithIcon('error', 'Búsqueda de zona', 'Debe insertar un al menos un parámetro para la búsqueda')
          return
        }

        this.params.attr = {}
        delete this.params.oper

        if (this.filter_search) {
          this.params.oper = []
          this.params.oper[0] = 'like|Name|%' + this.filter_search + '%|0'
        }
        if (this.filter_country) {
          this.params.attr.CountryId = this.filter_country
        }
        if (this.filter_state) {
          this.params.attr.StateId = this.filter_state
        }
        if (this.filter_city) {
          this.params.attr.CityId = this.filter_city
        }
        if (this.filter_zone) {
          this.params.attr.ZoneId = this.filter_zone
        }
        if (this.filter_language) {
          this.params.attr.Language = this.filter_language.toLowerCase()
        }
        this.load_data(0, this.pagination.pageSize)
      },
      change_table (pagination, filters, sorter) {
        this.load_data(pagination.current, pagination.pageSize)
      },
      change_pais (value) {
        this.select_country = {attr: {CountryId: value}}
      },
      change_city (value) {
        this.select_city = {attr: {CityId: value}}
      },
      change_state (value) {
        this.select_state = {attr: {StateId: value}}
      },
    }

  }
</script>

<style scoped>

</style>
