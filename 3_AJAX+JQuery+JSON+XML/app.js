var consultaJson = {}
// Funcion que se ejecuta al cargar la página 
$(document).ready(function () {

    cargarDeudores();

    $(".cliente").on('click', function () {
        alert("Clicked!");
        //consultarDeudas();
    })
});



function cargarDeudores() {
    /*
        - Especificar -> mimeType: "application/json"
          para evitar error de sintaxis en json válido
        - No dejar espacio entre contentType y su valor
          Lo mismo aplica para mimeType
    */
    $.ajax({
        type:"GET", 
        url:"./gastos_personales.json", 
        contentType:"application/json; charset=utf-8", 
        mimeType:"application/json; charset=utf-8", 
        success: function(jsonData) {
            consultaJson = jsonData;
            /* Iteramos sobre la data devuelta */
            var str = "";
            $.each(jsonData, function (i) {
                /* - Obtenemos los nombres y creamos la lista
                   - Definimos la funcion que se llama cuando se da click
                     y le pasamos el id de cada usuario como parámetro */
                var userName = jsonData[i].nombre;
                str = str + "<li>"+
                                "<a onclick='consultarDeudas("+jsonData[i].id+")' href='#'> " + userName + " </a>"+
                                "<div class='deudas' id='deudas-cliente"+jsonData[i].id+"'></div>"+
                            "</li>";
            });
            $("#lista-deudores").append(str);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Hubo problemas con la petición de los usuarios.');
        }
    });
}


function consultarDeudas(idUser) {

            /* Iteramos sobre la data almacenada */
            $.each(consultaJson, function (i) {

                if ( consultaJson[i].id == idUser ) {
                    /* Obtenemos los servicios */
                    var userServices = consultaJson[i].servicios;
                    /* Consultamos con otro ajax para cada servicio de un usuario */
                    $('.deudas').empty(); // Limpiamos data anterior
                    $("#deudas-cliente"+idUser).append("<h2>Detalle de lo adeudado</h2><br>");

                    for (var i = 0; i < userServices.length; i++) {
                        var serviceToFind = userServices[i].servicio;
                        var cantidadDeuda = userServices[i].deuda;
                        /*
                            IMPORTANTE:
                            Se define "async:false", para evitar asincronía y que el programa 
                            fluya de manera iterativa (secuencial).
                            Caso contrario, el AJAX solo toma el ultimo valor de los servicios
                            basicos y eso lo repite n-veces dependiendo de la cantidad de servicios.
                        */
                        $.ajax({
                            type:"GET", 
                            url:"servicios_basicos.xml", 
                            async:false, 
                            success: function (xmlData) {
                                var query = "servicio[tipo='"+serviceToFind+"']";
                                
                                var $cia = $(xmlData).find(query);
                                var cianame = $cia.find("nombre").text();
                                var ciadir = $cia.find("direccion").text();
                                var ciatel = $cia.find("telefono").text();

                                var ciaData = 
                                "<ul><li><strong>Nombre de la empresa:</strong> "+cianame+"</li>" + 
                                "<li><strong>Direccion:</strong> "+ciadir+"</li>" + 
                                "<li><strong>Telefono:</strong> "+ciatel+"</li>" + 
                                "<li><strong>Deuda:</strong> "+cantidadDeuda+"</li></ul>" + 
                                "<br>";

                                $("#deudas-cliente"+idUser).append(ciaData);
                                query = "";
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                alert('Hubo problemas con la petición de los servicios.');
                            }
                        });
                    }

                    
                    

                } /* if ID */

            });
}
