/*$(document).ready(function() {


    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Full Stack Junior Developer", "Analista de Sistemas"],
        typeSpeed: 100,
        backSpeed: 20,
        loop: true
    });
    var typed = new Typed(".typing-2", {
        strings: ["Debes iniciar sesion para ver mi PortFolio", "Puedes ingresar usando los siguientes datos:", "Usuario = invitado | Password = invitado"],
        typeSpeed: 100,
        backSpeed: 20,
        loop: true
    });


});*/



function mostrarPassword() {
    var cambio = document.getElementById("txtPassword");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }

}
/****** Ir arriba********/

$(document).ready(function() { irArriba(); });

function irArriba() {
    $('.ir-arriba').click(function() { $('body,html').animate({ scrollTop: '0px' }, 1000); });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) { $('.ir-arriba').slideDown(600); } else { $('.ir-arriba').slideUp(600); }
    });
    $('.ir-abajo').click(function() { $('body,html').animate({ scrollTop: '1000px' }, 1000); });
}
