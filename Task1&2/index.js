function parallax(){

    window.addEventListener('scroll', (e)=>{
        var scrolled = window.pageYOffset;
        const background = document.querySelector('.parallax');
        background.style.top = -(scrolled * 0.2) + 'px';
    });

}

parallax();

