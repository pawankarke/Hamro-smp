document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    var centeredMessage = document.querySelector('.centered-message');

    window.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY;

        
        var newTopPosition = 50 - scrollPosition / 9;


        centeredMessage.style.top = newTopPosition + '%';

        var opacity = Math.min(scrollPosition / 200, 1); 


        navbar.style.backgroundColor = 'rgba(24, 23, 21, ' + opacity + ')';
        
        
        
    });
});