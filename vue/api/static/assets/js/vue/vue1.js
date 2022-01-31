new Vue({

    el: '#app',
    data:{
        tableName: 'Usuarios',
        encabezados:['nombre','email','teléfono','entidad','cargo en la empresa'],
        personas: [
            {nombre:'Mario',email:'mario@gmail.com',telefono:'76991293',entidad:'MBProduction',cargoempresa:'Presidente'},
            {nombre:'Lili',email:'lili@gmail.com',telefono:'76991291',entidad:'MBProduction',cargoempresa:'Vicepresidenta'},
            {nombre:'Sergio',email:'sergio@gmail.com',telefono:'76991292',entidad:'MBProduction',cargoempresa:'Economista'},
            {nombre:'Janet',email:'janet@gmail.com',telefono:'76991293',entidad:'MBProduction',cargoempresa:'Encargado'},
            {nombre:'Oslo',email:'oslo@gmail.com',telefono:'76991294',entidad:'MBProduction',cargoempresa:'Guardio'},
            {nombre:'Ñoño',email:'nono@gmail.com',telefono:'76991295',entidad:'MBProduction',cargoempresa:'Comelón'}
        ],
    },
    methods:{
        cargarUsuarios: function(){
            this.tableName = 'Usuarios';
            this.encabezados = ['nombre','email','teléfono','entidad','cargo en la empresa'];
            this.personas = [
                {nombre:'Mario',email:'mario@gmail.com',telefono:'76991293',entidad:'MBProduction',cargoempresa:'Presidente'},
                {nombre:'Lili',email:'lili@gmail.com',telefono:'76991291',entidad:'MBProduction',cargoempresa:'Vicepresidenta'},
                {nombre:'Sergio',email:'sergio@gmail.com',telefono:'76991292',entidad:'MBProduction',cargoempresa:'Economista'},
                {nombre:'Janet',email:'janet@gmail.com',telefono:'76991293',entidad:'MBProduction',cargoempresa:'Encargado'},
                {nombre:'Oslo',email:'oslo@gmail.com',telefono:'76991294',entidad:'MBProduction',cargoempresa:'Guardio'},
                {nombre:'Ñoño',email:'nono@gmail.com',telefono:'76991295',entidad:'MBProduction',cargoempresa:'Comelón'}
            ];
        },

        cargarEntidades: function () {
            this.tableName = 'Entidades';
            this.encabezados = ['nombre','teléfono','descripcion','pais','provincia'];
            this.personas = [
                {nombre:'Cujae',telefono:'76991293',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'},
                {nombre:'USI',telefono:'76991291',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'},
                {nombre:'BAM',telefono:'76991292',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'},
                {nombre:'ONU',telefono:'76991293',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'},
                {nombre:'CALLO',telefono:'76991294',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'},
                {nombre:'EFTA',telefono:'76991295',descripcion:'MBProduction',pais:'Cuba',provincia:'Habana'}
            ];
        }
    }

});