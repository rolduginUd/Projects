let timeContainer = document.querySelector('.time'); // local time and date in header
let dateContainer = document.querySelector('.date');
function timeAndDate () {
    time = new Date().toLocaleDateString();
    date = new Date().toLocaleTimeString();
    timeContainer.textContent = time;
    dateContainer.textContent = date;
}
timeAndDate();

$(document).ready(function(){ // options for slider
    $('.slider').slick({
        speed: 300,
        variableWidth: true,
        arrows: false,
    });
});

$('[data-toggle="popover"]').popover({
    trigger: 'focus'
})

$('#navBar').on('hidden.bs.collapse', () => {
    $('#navBar')[0].classList.remove('d-flex');
    $('#changeCol')[0].setAttribute('class', 'col-12');
});
$('#navBar').on('show.bs.collapse', () => {
    $('#navBar')[0].classList.add('d-flex');
    $('#changeCol')[0].setAttribute('class', 'col-11');
});
         
$('#navTrigger').mouseenter(() => { //on hover show narrow nav
    $('.collapse').collapse('show');
    $('.slider').css({'display' : 'none'});
    $('#navTrigger').css({'display' : 'none'});
});  

$('#wideNavTrigger').on('click', function() { // on first click show wide nav
    if (!$(this).hasClass('clicked')) { 
        $(this).addClass('clicked'); 
        $('.text-white').removeClass('d-none');
        $('.smallMenu').removeClass('d-none'); 
        $('#wideNavChange')[0].removeAttribute("class");
        $('#wideNavChange').addClass('mt-1 mb-2'); 
        $('.mrlOnMenu').addClass('ml-2'); 
        $('#triggerImg').css({'transform' : 'rotate('+ 180 +'deg)'});
        $('#foot').css({'marginTop' : '50px'});
    }else {                                       // on second click hide nav
        $(this).removeClass('clicked'); 
        $('.collapse').collapse('hide');
        $('.text-white').addClass('d-none');
        $('#triggerImg').css({'transform' : 'rotate('+ 0 +'deg)'});
        $('.slider').css({'display' : 'block'});
        $('.smallMenu').addClass('d-none'); 

        $('.mrlOnMenu').removeClass('ml-2'); 

        $('#wideNavChange')[0].removeAttribute("class");
        $('#wideNavChange').addClass('col-2 d-flex flex-column align-items-center justify-content-around'); 

        $('#navTrigger').css({'display' : 'block'});
    }
  }); 
