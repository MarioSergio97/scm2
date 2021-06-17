<template>
  <!-- !show?{display:'none'}:{} -->
  <a-popover
    :overlayStyle="overlayStyle"
    :mouseLeaveDelay="0"
    :visible="show"
    :overlayClassName="'a-popover-validation has-error '+ overlayClass"
    :title="null"
    :placement="placement"
    :getPopupContainer="container"
  >
    <template slot="content">
      <p class="mb-0 d-block">{{textShow}}</p>
    </template>
    <slot ref="input"></slot>
  </a-popover>
</template>

<script>
/**
 * @param text
 * @param show
 * @param container
 */
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    container: {
      type: Function,
      default: () => document.body
    },
    placement: {
      type: String,
      default: 'right'
    },
    overlayStyle: {
      type: Object
    },
    overlayClass: String
  },
  computed: {
    textShow () {
      return this.text || this.lastText
    }
  },
  watch: {
    text: function (val, old) {
      this.lastText = old
    }
  },
  data () {
    return {
      lastText: ''
    }
  }
}
</script>
<style lang="scss">
.a-popover-validation {
  &.ant-popover-placement-right .ant-popover-arrow,
  &.ant-popover-placement-rightTop .ant-popover-arrow,
  &.ant-popover-placement-rightBottom .ant-popover-arrow {
    left: 7.49px !important;
    border-left: 1px solid red !important;
    border-bottom: 1px solid red !important;
  }

  &.ant-popover-placement-left .ant-popover-arrow,
  &.ant-popover-placement-leftTop .ant-popover-arrow,
  &.ant-popover-placement-leftBottom .ant-popover-arrow {
    right: 7.49px !important;
    border-right: 1px solid red !important;
    border-top: 1px solid red !important;
  }

  &.ant-popover-placement-top .ant-popover-arrow,
  &.ant-popover-placement-topLeft .ant-popover-arrow,
  &.ant-popover-placement-topRight .ant-popover-arrow {
    bottom: 7.03px;
    border-right: 1px solid red !important;
    border-bottom: 1px solid red !important;
  }

  &.ant-popover-placement-bottom .ant-popover-arrow,
  &.ant-popover-placement-bottomLeft .ant-popover-arrow,
  &.ant-popover-placement-bottomRight .ant-popover-arrow {
    top: 7.4px;
    border-top: 1px solid red !important;
    border-left: 1px solid red !important;
  }

  .ant-popover-arrow {
    background: white;
  }

  &.has-error {
    p {
      color: red;
    }

    .ant-popover-inner {
      border: 1px solid red;
    }
  }
}
</style>
