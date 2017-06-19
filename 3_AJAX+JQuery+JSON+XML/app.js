// Funcion que se ejecuta al cargar la página 
$(document).ready(function () {
    $("#requerimiento").on('click', function () {
        console.log("Clicked!");
        consultarDeudas();
    })
});


function consultarDeudas() {
    $.ajax({
        type: "GET",
        url: "./gastos_personales.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {},
        success: function(json) {
            console.log(json);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        }
    });


    /*
        Especificar -> mimeType: "application/json"
        para evitar error de sintaxis en json válido
    */
    /*
    $.ajax({
        type: 'GET', 
        mimeType: 'application/json', 
        url: 'gastos_personales.json' 
    })
    .done(function( data, textStatus, jqXHR ) {
         if ( console && console.log ) {
             console.log( "La solicitud se ha completado correctamente." );
         }
        console.log(data);
        $.each(data, function (i) {
            var user = data[i];
            var userName = user.name;
            var userServices = user.servicios;
            console.log(userName);
            console.log(userServices);
        });
     })
    .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud a fallado: " +  textStatus);
         }
    });
    */
}