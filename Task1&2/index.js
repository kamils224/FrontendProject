$(document).ready(function(){
    toggleMenu();
    scrollAnimation();
    contentFadeIn();
})




toggleMenu = function(){

    var hideMenu = true;
    var topValue = $('#main_navigation').position().top;
    const showMenuHeight = 570;
    $('.show-menu').on('click',function(){
        if(hideMenu === false){
            $('#main_navigation').animate({top:topValue},500);
            hideMenu = true;
        }else{
            $('#main_navigation').animate({top: showMenuHeight},700);
            hideMenu = false;
        }
    })
}

const menuTop = $('#menu_page').offset().top;
const newsTop = $('#news_page').offset().top;
const scheduleTop = $('#schedule').offset().top
const descriptionTop = $('#description').offset().top;
const accomodationTop = $('#accommodation').offset().top;
const academyTop = $('#academy').offset().top;
const abcTop = $('#abc_golfa').offset().top;
const contactTop = $('#contact').offset().top;


scrollAnimation = function(){
    const delay = 500;
    const type = "linear";
    $('#nav_news').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: newsTop}, delay, type);
    });
    $('#nav_tournament').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: scheduleTop}, delay, type);
    });
    $('#nav_description').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: descriptionTop}, delay, type);
    });
    $('#nav_accomodiation').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: accomodationTop}, delay, type);
    });
    $('#nav_academy').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: academyTop}, delay, type);
    });
    $('#nav_abc').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: abcTop}, delay, type);
    });
    $('#nav_contact').on('click', function(e){
        $('html,body').animate({ 
            scrollTop: contactTop}, delay, type);
    });
}


contentFadeIn = function(){
    const offset = 400;
    const delay = 400;

    $(document).scroll(function(){
        var y = $(this).scrollTop();
        if (y < menuTop + offset){
            $('#secondary_menu').fadeIn(delay);
            $('#news_info').fadeOut(delay);
        }else if (y < newsTop + offset) {
            $('#news_info').fadeIn(delay);
            $('#secondary_menu').fadeOut(delay);
            $('#calendar').fadeOut(delay);
        }else if (y < scheduleTop + offset){
            $('#calendar').fadeIn(delay);
            $('#news_info').fadeOut(delay);
            
        }else if (y <descriptionTop + offset){
            $('#calendar').fadeOut(delay);
            $(".accomodation-image").fadeOut(delay*2);
        }else if (y < accomodationTop + offset){
            $('.accomodation-image').fadeIn(delay*2);
        }
    })
}