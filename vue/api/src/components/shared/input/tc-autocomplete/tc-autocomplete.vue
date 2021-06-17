<template>
  <div class="w-100 position-relative">
    <a-form-item
      ref="formItem"
      class="m-0 p-0"
      :has-feedback="true"
      :validate-status="validateStatus"
    >
      <popover-validation :placement="popoverPlacement" :text="getText" :show="showPopover">
        <div @mouseenter="hover = true" @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-tree-select
            @change="handleChange"
            :size="size"
            :treeCheckable="treeeCheckable"
            :id="id"
            :showSearch="!loading&&!fetching"
            :disabled="disabled"
            :getPopupContainer="container"
            :value="value"
            :defaultValue="defaultValue"
            @select="select_element"
            :style="{width:'100%'}"
            :filterTreeNode="filter"
            :dropdownStyle="{overflow: 'auto' }"
            :placeholder="placeholder"
            searchPlaceholder="Filtrar..."
            dropdownClassName="tc-autocomplete"
            allowClear
          >
            <a-tree-select-node
              v-if="loading||fetching"
              class="loading-autocomplete"
              :selectable="false"
            >
              <spinner size="small" slot="title"/>
            </a-tree-select-node>

            <a-tree-select-node
              v-else
              v-for="opt in data"
              @select="select_element"
              :selectable="true"
              :value="opt[idKey]+''"
              :key="opt[idKey]"
              :text="opt[textKey]"
              :title="opt[textKey]"
            />
          </a-tree-select>
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
  import {focus} from 'vue-focus'
  import {TcInputMixing} from '../tc-input/tc-inputs-mixing'
  import axios from '../../../../config/axios/axios'

  export default {
    directives: {focus},
    mixins: [TcInputMixing],
    props: {
      fetching: Boolean,
      idKey: {
        type: String,
        default: 'id'
      },
      class_style: {
        type: Object,
        default: () => {
          width:'100%'
        }
      },
      id: {
        type: String,
        default: () => Math.random().toString(36).substr(2, 5)
      },
      treeeCheckable: {
        type: Boolean,
        default: false
      },
      search_params: {
        type: Object,
        default: null
      },
      textKey: {
        type: String,
        default: 'text'
      },
      defaultValue: String | Number,
      dataSource: Array,
      url: String
    },
    data: () => {
      return {
        self_data: null,
        loading: false,
        selected_object: null
      }
    },
    computed: {
      // dataSource if data is pased for props, or self_data for search data in url on mounted
      data () {
        return this.dataSource || this.self_data
      },
      selected () {
        const v = this.value
        return this.data.find(element => element.id === this.value)
      }
    },
    async beforeMount () {
      if (this.url) {
        this.refresh()
      }
    },

    methods: {
      load () {
        this.refresh()
      },
      select_element (value, node) {
        this.selected_object = node
      },
      clear () {
        this.$emit('onClear')
      },
      changeParams () {
      },
      filter (input, treeNode) {
        return (
          treeNode.data.attrs.text ? treeNode.data.attrs.text.toUpperCase().indexOf(input.toUpperCase()) >= 0 : false
        )
      },
      refresh () {
        this.loading = true
        const params = this.search_params
        axios.get(this.url, {params}).then(({data}) => {
          this.loading = false
          this.self_data = data.data
        })
      }
    },
    watch: {
      value: function (value, old) {
        if (!value && old) {
          this.$emit('onClear')
        }
      },
      search_params: {
        deep: true,
        handler (value, oldValue) {
          if (value) {
            this.$parent.$nextTick(this.refresh)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .loading-autocomplete {
    .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
      background-color: white;
    }
  }
</style>
