
// $(document).ready(function(){
// alert("Hello World");
// });

$("#about").click(function(){
    $('html, body').animate({
        scrollTop: $("#about-div").offset().top},
        'slow');
});


$("#project").click(function(){
    $('html, body').animate({
        scrollTop: $("#project-div").offset().top},
        'slow');
});
