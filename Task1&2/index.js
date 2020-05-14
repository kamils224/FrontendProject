$(document).ready(function(){
    toggleMenu();
})




toggleMenu = function(){

    var hideMenu = true;
    var topValue = $('#main_navigation').position().top;
    const showMenuHeight = 570;
    console.log(topValue); 
    $('.show-menu').on('click',function(){
        console.log('click');
        if(hideMenu === false){
            $('#main_navigation').animate({top:topValue},700);
            hideMenu = true;
        }else{
            $('#main_navigation').animate({top: showMenuHeight},700);
            hideMenu = false;
        }
    })
}