import axios from "../../config/axios/axios"
import * as utils from "../utils/utils.js";

/**Generate by ASGENS
*@author Charlietyn 
*@date Mon Dec 28 11:12:15 GMT-05:00 2020  
*@time Mon Dec 28 11:12:15 GMT-05:00 2020  
*/

const header = (isFormdata) => !isFormdata?{'Content-Type':'application/json; charset=UTF-8'}:{'Content-Type':'multipart/form-data'};

export default class BaseModel {

  isFormData = false

  static get url () {
    return ''
  };

  get url () {
    return ''
  };

  getFormData () {
    return utils.objectToFormData(this)
  };

  static get select_2_url () {
    return this.url + '/select_2_list'
  };

  constructor (attributes = null) {

  }

  dto(){
    return this;
  }
  object () {
    const value = Object.assign({}, this)
    delete value.isFormData
    return this.isFormData ? this.getFormData() : value
  }

  static columns = []

  create () {
    // console.log("se esta crando la url: "+ this.url);
    // console.log("el objeto: "+ this.object());
    // console.log("y el encabezado: "+ header(this.isFormData));

    return axios.post(this.url, this.object(), header(this.isFormData)).then((response) => {
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

  save () {
    return this.get_id() ? this.update() : this.create()
  }

  update () {
    return axios.patch(this.url + '/' + this.get_id(), this.object(), header(this.isFormData)).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  get_id () {
    return -1
  }

  delete () {
    return axios.delete(this.url + '/' + this.get_id(), {
      data: this.object()
    }).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static delete_mult (params) {
    return axios.delete(this.url + '/delete_parameters', {
      data: params
    }).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static delete_by_ids (array_id) {
    return axios.delete(this.url + '/delete_by_id', {
      data: array_id
    }).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

 static show_columns (columns_name, show = true) {
    const columns =columns_name==null ? this.columns: columns_name.map((element) => {
      return this.columns.find((c) => c.key == element)
    })
    return columns_name == null ? this.columns : show ? columns : this.columns.filter((element) => {
      return columns_name.indexOf(element.key) == -1
    })
  }

  static update_mult (params) {
    return axios.patch(this.url + '/update_multiple', {
      params
    }, header(this.isFormData)).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static list (params) {
    return axios.get(this.url, {
      params
    }).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static validate (params) {
    if (axios.pending && utils.compare_object(axios.pending.params, params)) {
      axios.pending.token.cancel('Validate request canceled')
    }
    axios.pending = {
      params: params,
      token: axios.CancelToken.source()
    }
    return axios.post(this.url + '/validate',
      params,
      {cancelToken: axios.pending.token.token}
    ).then((response) => {
      axios.pending = null
      return response
    }).catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static view (id, params = null) {
    return axios.get(this.url + '/' + id, {params}).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

  static select_2_list (params) {
    return axios.get(this.url + '/select_2_list', {
      params
    }).then((response) => {
      return response
    }).catch(error => {
      throw JSON.parse(JSON.stringify(error))
    })
  }

}
