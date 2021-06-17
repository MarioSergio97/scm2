<template>
  <!-- <link rel="stylesheet" href="../../../static/login/css/style.css"> -->
  <login/>
</template>

<script>
  import Vue from 'vue'
  import login from './TemplateLogin'

  export default {
    name: 'Login',
    components: {
      login
    },
    beforeCreate () {

    },
    beforeDestroy () {
      const recaptchaScripts = document.querySelectorAll('script')
      for (let i = 0; i < recaptchaScripts.length; i += 1) {
        recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i])
      }
    },
    async mounted () {
       Vue.loadScript('../../../static/assets/vendors/js/vendor.bundle.base.js')
       Vue.loadScript('../../../static/assets/vendors/js/vendor.bundle.addons.js')
       Vue.loadScript('../../../static/assets/js/off-canvas.js')
       Vue.loadScript('../../../static/assets/js/hoverable-collapse.js')
       Vue.loadScript('../../../static/assets/js/misc.js')
       Vue.loadScript('../../../static/assets/js/settings.js')
       Vue.loadScript('../../../static/assets/js/todolist.js')
    },
    methods: {
    }
  }
</script>

<style scoped>
  .menu-title {
    color: #9882d0;
    font-weight: bold;
    font-style: italic;
    font-size: 2rem;
    margin-top: 15px;
  }

  .menu-title-span {
    color: #68559f;
  }

  .menu-user {
    color: #ffffff;
    font-size: 1rem;
    margin: 1rem;
  }

  .menu-user-span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  
</style>