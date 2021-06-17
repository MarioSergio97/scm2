/*
*Generate by ASGENS
*@author Charlietyn
*@date Thu Sep 03 00:09:29 GMT-04:00 2020
*@time Thu Sep 03 00:09:29 GMT-04:00 2020
*/
import {notification} from 'ant-design-vue'

/**
 * Returns booleam if  the object contains this value in one of the attributes
 * @param {Object} object the object to compare
 * @param {String} value to contain
 */
export function filter_object (object, value, columns = null) {
  if (!value) {
    return true
  }
  const keys = Object.keys(object)
  let i
  for (i of keys) {
    if (object[i] == null) {
      continue
    }
    if (object[i].toString().toLowerCase().indexOf(value.toLowerCase()) != -1) {
      return true
    }
  }
}

export function compare_object (object1, object2) {
  return Object.keys(object1).every(function (element) {
    return Object.keys(object2).find(function (element2) {
      return element == element2
    })
  })
}

export function process_data (v) {
  const head = v.columns.filter(element => element.key != 'action_elements' && element.dataIndex != undefined).map(element => {
    return element.title
  })
  const data = v.data.map((element) => {
    return v.columns.filter(column => column.dataIndex != null).map((column) => {
      let nested = null
      if (column.dataIndex.indexOf('.') != -1) {
        column.dataIndex.split('.').forEach((index) => {
          nested = !nested ? element[index] : nested[index]
        })
      }
      let value = column.dataIndex.indexOf('.') == -1 ? element[column.dataIndex] : nested
      return value
    })
  })
  return {head, data}
}

export function exportToExcelVinstance (v) {
  const {head, data} = process_data(v)
  exportToExcel(head, data)
}

export function exportToCSV (v) {
  const {head, data} = process_data(v)
  let csvContent = [head].concat(data).map(e => e.join(",")).join("\n");
  const hiddenElement = document.createElement('a')
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'output.csv'
  hiddenElement.click()
}

export function extract_user_data(id_name,token){
  const user_data=jwtDecode(token).payload
  return {[id_name]:user_data.uid,...JSON.parse(user_data.user)}
}

export function exportToExcel (head, data) {
  const uri = 'data:application/vnd.ms-excel;base64,'
  const template = '' +
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
    '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>' +
    '<body>' +
    '<table>' +
    '{table}' +
    '</table>' +
    '</body>' +
    '</html>'
  let table = '<thead><tr>'
  head.forEach((element) => {
    table += '<th style="width: 250px">' + element + '</th>'
  })
  table += '</tr></thead><tbody>'
  data.forEach((element) => {
    table += '<tr>'
    element.forEach((data) => {
      table += '<td>' + data + '</td>'
    })
    table += '</tr>'
  })
  table += '</tbody>'

  const base64 = function (s) {
    return window.btoa(unescape(encodeURIComponent(s)))
  }
  const format = function (s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p]
    })
  }

  const ctx = {
    worksheet: 'Worksheet',
    table: table
  }

  const link = document.createElement('a')
  link.download = 'export.xls'
  link.href = uri + base64(format(template, ctx))
  link.click()
}

export function allow_character(elEvento, permitidos) {
  // Variables que definen los caracteres permitidos
  var numeros = "0123456789";
  var decimal = "0123456789."
  var date = "0123456789/"
  var time = "0123456789:"
  var issn = "0123456789-"
  var none = ""
  var caracteres = " abcdefghijklmn?opqñrstuvwxyzABCDEFGHIJKLMÑN?OPQRSTUVWXYZéáíóú";
  var numeros_caracteres = numeros + caracteres;
  var teclas_especiales = [8, 37, 39, 46];
  // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha
  // Seleccionar los caracteres a partir del par?metro de la funci?n
  switch(permitidos) {
    case 'num':
      permitidos = numeros;
      break;
    case 'car':
      permitidos = caracteres;
      break;
    case 'num_car':
      permitidos = numeros_caracteres;
      break;
    case 'dec':
      permitidos=decimal;
    case 'date':
      permitidos=date;
      break;
    case 'time':
      permitidos=time;
      break;
    case 'issn':
      permitidos=issn;
      break;
    case 'none':
      permitidos=none;
      break;
  }

  // Obtener la tecla pulsada
  var evento = elEvento || window.event;
  var codigoCaracter = evento.charCode || evento.keyCode;
  var caracter = String.fromCharCode(codigoCaracter);

  // Comprobar si la tecla pulsada es alguna de las teclas especiales
  // (teclas de borrado y flechas horizontales)
  var tecla_especial = false;
  for(var i in teclas_especiales) {
    if(codigoCaracter == teclas_especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
  // o si es una tecla especial
  return permitidos.indexOf(caracter) != -1 || tecla_especial;

}
export function filter_object_column (object, value, columns) {
  if (!value) {
    return true
  }
  let i
  let iter = 0
  const keys = Object.values(columns)
  for (i of keys) {

    if (!i.dataIndex) {
      if (iter >= keys.length) {
        return false
      }
      continue
    }
    let array = i.dataIndex.split('.')
    if (object[array.length > 0 ? array[0] : i.dataIndex] instanceof Object) {
      let data = object
      array.forEach((iter) => {
        data = data[iter]
      })
      if (data != null && data.toString().toLowerCase().indexOf(value.toLowerCase()) != -1) {
        return true
      }
    } else {
      if (object[array[0]] != null && object[array[0]].toString().toLowerCase().indexOf(value.toLowerCase()) != -1) {
        return true
      }
    }
  }
}

export function openNotificationWithIcon (type, title, message) {
  notification[type]({
    message: title,
    description: message
  })
}

export function capitalize (s) {
  if (typeof s !== 'string') return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function process_error (error) {
  let message = 'Error'
  let description = ''
  if (error.response) {
    description = error.response.data.message
    message = error.response.statusText
    if (error.response.status == 404) {
      description = 'Page not found'
    }
  } else if (error.request) {
    description = JSON.stringify(error.request)
  } else {
    description = error.message
  }
  openNotificationWithIcon('error', message, description)
}

export function dynamic_import (regexp, requireModule) {
  const classes = {}
  requireModule.keys().forEach(fileName => {
    const moduleName = capitalize(fileName.replace(regexp, '').substr(fileName.replace(regexp, '').lastIndexOf('/') + 1, fileName.length))
    classes[moduleName] = {
      ...requireModule(fileName)
    }
  })
  return classes
}

export function process_response (response, action) {
  let message = ''
  let description = ''
  let type = ''
  if (!response.data.success) {
    description = JSON.stringify(response.data.errors)
    message = 'Error en acción ' + action
    type = 'error'
  } else {
    description = 'El elemento fue ' + action + ' exitosamente'
    message = 'Acción ejecutada correctamente'
    type = 'success'
  }
  openNotificationWithIcon(type, message, description)
  return response.data.success
}

export const breadcrumbRouter = (url) => {
  return []
}

export const jwtDecode = function (t) {
  let token = {}
  token.raw = t
  token.header = JSON.parse(window.atob(t.split('.')[0]))
  token.payload = JSON.parse(window.atob(t.split('.')[1]))
  return (token)
}

export const objectToFormData = function (obj, form, namespace) {

  var fd = form || new FormData()
  var formKey

  for (var property in obj) {
    if (obj[property] === undefined) {
      continue
    }
    if (obj.hasOwnProperty(property)) {

      if (namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

        objectToFormData(obj[property], fd, property)

      } else {

        // if it's a string or a File object
        const value = obj[property] == true || obj[property] == false ? +obj[property] : obj[property]
        fd.append(formKey, value)
      }

    }
  }

  return fd

}

export function isEmptyObject (obj) {
  return Object.keys(obj).length === 0
}

export const birthDateFromCI = (ci) => {
  const year = ci.substr(0, 2)
  const month = ci.substr(2, 2)
  const day = ci.substr(4, 2)
  return new Date(`${year}/${month}/${day}`)
}

export const validateNumber = (e) => {
  let key = e.keyCode
  if (key < 48 || key > 57) {
    e.preventDefault()
  }
}

export const changeSelectTitle = (value) => {
  document.querySelector('.phone_code .ant-select-selection .ant-select-selection__rendered .ant-select-selection-selected-value').innerText = `+${value}`
}

export const getBirthDate = (ci) => {
  const year = parseInt(ci.substr(0, 2))
  const month = ci.substr(2, 2)
  const day = ci.substr(4, 2)
  const dateString = `${year > 20 ? '19' : '20'}${year}/${month}/${day}`
  const date = new Date(dateString)

  return date
}
export const getSex = (ci) => {
  const sexNumber = ci[ci.length - 2]
  return sexNumber % 2 === 0 ? 'Masculino' : 'Femenino'
}

export const getAge = (date) => {
  let ageDifMs = Date.now() - new Date(date).getTime()
  let ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}


