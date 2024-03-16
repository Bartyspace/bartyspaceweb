$(window).scroll(function(){
    if ($(this).scrollTop() > 50) {
       $('#dynamic').addClass('newClass');
    } else {
       $('#dynamic').removeClass('newClass');
    }
});