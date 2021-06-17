<template>
  <a-modal
    :width="500"
    :maskClosable="false"
    :title="title"
    :destroyOnClose="true"
    :visible="visible"
    @cancel="$emit('cancel')"
    @ok="handleOk"
    okText="Aceptar"
    cancelText="Cancelar"
  >
    <div style="min-height:200px" class="checkboxes-container position-relative">
      <spinner v-if="loading || fetching" />
      <a-checkbox-group
        class="row row-cols-3"
        :options="optionsMapped"
        v-model="selected"
        @change="onChange"
      />
    </div>

    <div slot="footer">
      <div class="d-flex">
        <a-button
          @click="$emit('openInnerModal')"
          type="dashed"
          icon="plus"
          class="dashed-primary mr-auto"
        >Agregar</a-button>
        <a-button @click="$emit('cancel')">Cancelar</a-button>
        <a-button @click="handleOk" type="primary">Aceptar</a-button>
      </div>
    </div>

    <slot></slot>
  </a-modal>
</template>

<script>
import axios from '../../../../config/axios/axios'
export default {
  props: {
    visible: Boolean,
    // Title of modal
    title: String,
    // Initial selected values
    checkedValues: Array,
    fetching: Boolean,
    // Url of data to select. Should be a select_2_list url
    url: String,
    idKey: {
      type: String,
      default: 'id'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    // Options array instead of url
    options: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selected: [],
    self_options: [],
    loading: false
  }),
  computed: {
    optionsMapped () {
      const OPTIONS = this.options.length ? this.options : this.self_options
      return OPTIONS.map(option => ({
        value: option[this.idKey],
        label: option[this.textKey]
      }))
    }
  },
  methods: {
    onChange (checkedValues) {
      this.$emit('change', checkedValues)
    },
    handleOk () {
      this.$emit('selected', this.selected)
      this.$emit('cancel')
    }
  },
  beforeMount () {
    // Initial selected values
    if (this.checkedValues) {
      this.selected = this.checkedValues
    }
    // If url prop, get data from url
    if (this.url) {
      this.loading = true
      axios.get(this.url).then(({ data }) => {
        this.loading = false
        this.self_options = data.data
      })
    }
  }
}
</script>
