
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


$("#art").click(function(){
    $('html, body').animate({
        scrollTop: $("#art-div").offset().top},
        'slow');
});


// Slideshow

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("photoshop");
  if (n >= x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}


var slideIndexBlender = 1;
showDivsBlender(slideIndexBlender);

function plusDivsBlender(n) {
  showDivsBlender(slideIndexBlender += n);
}

function currentDivBlender(n) {
  showDivsBlender(slideIndexBlender = n);
}

function showDivsBlender(n) {
  var i;
  var x = document.getElementsByClassName("mySlidesBlender");
  var dots = document.getElementsByClassName("blender");
  if (n > x.length) {slideIndexBlender = 1}    
  if (n < 1) {slideIndexBlender = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndexBlender-1].style.display = "block";  
  dots[slideIndexBlender-1].className += " w3-white";
}

