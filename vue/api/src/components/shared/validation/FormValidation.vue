<template>
  <a-form ref="form" class="mt-2">
    <slot></slot>
  </a-form>
</template>

<script>
export default {
  props: {
    feedbacks: Object,
    container: Function,
    vobject: Object,
    nested: String
  },
  methods: {
    shake () {
      this.$refs.form.$children.forEach(children => {
        if (children.shake) {
          children.shake()
        }
      })
    },
    validate () {
      let valid = true
      this.$refs.form.$children.forEach(children => {
        if (children.hasOwnProperty('validate')) {
          if (!children.validate()) {
            valid = false
          }
        }
      })
      return valid
    },
    reset () {
      this.$refs.form.$children.forEach(children => {
        if (children.hasOwnProperty('clear')) {
          children.clear()
        }
      })
    }
  },
  components: {},
  data: () => ({})
}
</script>
