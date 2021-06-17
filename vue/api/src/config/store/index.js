import * as model_factory from '../../entities/models'
import Vue from 'vue'
export const state = Vue.observable({
  site: model_factory.instance('Site'),
  url: process.env.BASE_URL,
  image_url: process.env.BASE_URL
})
