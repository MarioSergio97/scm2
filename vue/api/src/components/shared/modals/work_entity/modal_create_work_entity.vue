<template>
  <a-modal
    :maskClosable="false"
    title="Agregar entidad laboral"
    :visible="visible"
    @cancel="$emit('cancel')"
    @ok="handleOk"
    okText="Agregar"
    cancelText="Cancelar"
  >
    <div ref="formContainer">
      <tc-form ref="form" :container="()=> $refs.formContainer" :vobject="$v" class="form-row">
        <div class="form-group col-12 p-0">
          <label>Organismo</label>
          <tc-form-item class="flex-center flex-row mb-0">
            <tc-autocomplete
              placeholder="Seleccione el centro de remisión"
              name="organism"
              v-model="organism"
              :defaultValue="organism"
            />
            <a-button type="dashed" icon="plus" class="dashed-primary ml-2 rounded-0"></a-button>
          </tc-form-item>
        </div>

        <tc-form-item class="form-group mb-0 mt-4 col-12">
          <label>Nombre de la Entidad</label>
          <tc-input name="entityName" v-model="entityName"></tc-input>
        </tc-form-item>
      </tc-form>
    </div>
  </a-modal>
</template>
modal_create_work_entity
<script>
import { required } from 'vuelidate/lib/validators'
import { VALUE_REQUIRED } from '../../../shared/validation/validationsTexts'

export default {
  props: {
    visible: Boolean
  },
  // Becuause directions of province and country are not in Pacient model
  validations: {
    organism: {
      required
    },
    entityName: {
      required
    }
  },
  computed: {},
  methods: {
    handleOk () {
      if (this.$refs.form.validate()) {
      }
    }
  },
  watch: {},
  components: {},
  data: () => ({
    organism: '',
    entityName: ''
  })
}
</script>
