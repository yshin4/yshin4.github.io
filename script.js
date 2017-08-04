console.log("CALLED");

$("#about").click(function() {
    $('html,body').animate({
        scrollTop: $("#aboutSection").offset().top},
        'slow');
});

$("button").click(function(){
  alert("WOOF");
});
