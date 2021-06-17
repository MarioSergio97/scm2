import axios from '../../config/axios/axios'
import * as utils from '../utils/utils.js'
import SimpleCrypto from "simple-crypto-js"
import * as mb from '../../entities/models'

/**Generate by ASGENS
 *@author Charlietyn
 *@date Thu Sep 12 00:09:29 GMT-04:00 2020
 *@time Thu Sep 12 00:09:29 GMT-04:00 2020
 */
const simpleCrypto = new SimpleCrypto("scm")

export default class SiteModel {
  _user = undefined

  static get url () {
    return ''
  };

  get url () {
    return ''
  };
  get mb(){
    return mb
  }

  get user () {
    return  localStorage.getItem('uth')?Object.freeze(utils.extract_user_data('id_user', simpleCrypto.decrypt(localStorage.getItem('uth')))):null
  }

  set user (value) {
    this._user = value
  }

  login (params = {}, isFormData = false) {
    return axios.post(this.url + 'login', params).then((response) => {
      const token_hash= simpleCrypto.encrypt(response.data.token);
      localStorage.setItem('uth',token_hash);
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  logout (params = {}, isFormData = false) {
     localStorage.removeItem('uth');
    // return axios.post(this.url + 'logout', params).then((response) => {
    //   return response
    // }).catch(error => {
    //   throw JSON.parse(JSON.stringify(error))
    // })
  }

  signup (params = {}, isFormData = false) {
    return axios.post(this.url + 'signup', params, header(isFormData)).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static custom (verb, action, params = {}, header = {'Content-Type': 'application/json; charset=UTF-8'}) {
    return axios[verb](this.url + '/' + action, params, header).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }
}


