<template>
  <a-modal
    :width="500"
    :style="{top:'20px'}"
    :maskClosable="false"
    :title="title"
    :destroyOnClose="true"
    :visible="visible"
    @cancel="onCancel"
    @ok="handleOk"
    okText="Aceptar"
    cancelText="Cancelar"
  >
    <div ref="formContainer">
      <spinner v-if="loading" />
      <tc-form
        ref="form"
        :container="()=> $refs.formContainer"
        :vobject="$v"
        nested="direction"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-12 px-2">
          <label>Dirección</label>
          <tc-input name="direction_text" v-model="direction.direction_text"></tc-input>
        </tc-form-item>

        <tc-form-item class="form-group mb-0 col-6 px-2">
          <label>País</label>
          <tc-autocomplete
            @onClear="clearProvinces"
            @change="countryChange"
            name="id_country"
            textKey="name_country"
            idKey="id_country"
            placeholder="Seleccione el país"
            :fetching="fetchingCountries"
            :defaultValue="default_country"
            :dataSource="countries"
            v-model="direction.id_country"
          />
        </tc-form-item>

        <tc-form-item class="form-group mb-0 col-6 px-2">
          <label>Provincia</label>
          <tc-autocomplete
            placeholder="Seleccione la provincia"
            name="id_province"
            textKey="province"
            idKey="id_province"
            v-model="direction.id_province"
            :disabled="provinces.length===0"
            :fetching="fetchingProvinces"
            :dataSource="provinces"
            :defaultValue="direction.id_province+''"
          />
        </tc-form-item>

        <tc-form-item class="form-group mb-0 col-12 px-2">
          <label>Municipio</label>
          <tc-autocomplete
            :disabled="towns.length===0"
            placeholder="Seleccione el municipio"
            name="id_town"
            textKey="town"
            idKey="id_town"
            v-model="direction.id_town"
            :dataSource="towns"
            :defaultValue="direction.id_town+''"
          />
        </tc-form-item>
      </tc-form>
    </div>
  </a-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Pacient from '../../../../entities/models/modules/administration/pacient.model'
import Country from '../../../../entities/models/modules/nomenclature/country.model'
import Town from '../../../../entities/models/modules/nomenclature/town.model'

export default {
  props: {
    title: String,
    parent: Object,
    directionType: String,
    visible: { type: Boolean, default: true },
    defaultTownId: Number | String,
    defaultDirection: { type: String, default: '' },
    default_country: 192
  },
  // Becuause directions of province and country are not in Pacient model
  validations: {
    direction: {
      direction_text: {
        required
      },
      id_province: {
        required
      },
      id_country: {
        required
      },
      id_town: {
        required
      }
    }
  },
  data: () => ({
    countries: [],
    provinces: [],
    loading: false,
    province_selected: null,
    fetchingCountries: false,
    fetchingProvinces: false,
    direction: {
      direction_text: '',
      id_country: '',
      id_province: '',
      id_town: ''
    }
  }),
  async beforeMount () {
    this.fetchingCountries = true
    Country.list().then(res => {
      this.fetchingCountries = false
      this.countries = res.data
    })

    this.direction.direction_text = this.defaultDirection || ''

    if (this.defaultTownId) {
      this.loading = true

      const params = {
        attr: {
          id_town: this.defaultTownId
        },
        relations: ['province', 'province.country']
      }

      const { data } = await Town.list(params)
      this.direction.id_town = this.defaultTownId || ''
      this.direction.id_province = data[0].province.id_province
      this.direction.id_country = data[0].province.country.id_country
      this.countryChange(this.direction.id_country)
    }
  },
  computed: {
    towns () {
      const province = this.provinces.find(
        province => province.id_province == this.direction.id_province
      )

      return province ? province.arraytown : []
    },
    person () {
      return this.parent.pacient
    }
  },
  methods: {
    clearProvinces () {
      console.log('clear')

      this.province_selected = null
      this.provinces = []
    },
    handleOk () {
      if (this.$refs.form.validate()) {
        this.$emit('ok', this.direction)
      }
    },
    async countryChange (id_country) {
      if (id_country) {
        this.fetchingProvinces = true
        Country.list({
          attr: { id_country },
          relations: ['arrayprovince.arraytown']
        }).then(res => {
          this.loading = false
          this.fetchingProvinces = false
          const { data } = res
          this.provinces = data[0].arrayprovince
        })
      }
    },
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
