/// <reference types="../../node_modules/@types/jquery"/>
$(function (){
    let categoryValue = 'trending/movie/day';
    let Movieimage;
    let movieStars;
    let movieOverview;
    let releaseDate;
    let MovieTitle;
    let MovieRate;
    let searchValue1;
    displayData();
    $('[apivalue]').on('click', function(element){
    if(categoryValue == element.target.getAttribute('apiValue')){}
    else{
        categoryValue = element.target.getAttribute('apiValue')
        displayData();
    }
    })
    $('#default-search').on('keyup',function (){
        searchValue1 = document.getElementById('default-search').value
        if(searchValue1 == null || searchValue1 == ''){
            displayData();
        }
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?query=${searchValue1}&api_key=8fc1a988bc6894900dbd51b508cc8127`,
            method: 'GET',
            headers:{
                accept: 'application/json',
            },
            success : function(response) {
                $.each(response, function(index, element){
                    if(typeof element == 'object'){
                        $.each(element,function(index2, element2){
                            console.log(element2)
                            Movieimage = checkMovieImage(element2);
                            movieStars = checkMovieVote(element2);
                            movieOverview = checkMovieDesc(element2);
                            releaseDate = checkMovieDate(element2);
                            MovieTitle = checkMovieTitle(element2);
                            MovieRate = element2.vote_average ?? '?';
                            $('#content').append(`
                            <div class="relative w-[90%] sm:w-[45%] md:w-[30%] overflow-hidden group meal-click rounded-lg p-4">
                                <div class="[transform:perspective(1px)_translateZ(0)] transition-all">
                                    <img class="h-full w-full rounded-lg group-hover:scale-125 group-hover:rotate-[6deg] duration-300" src="${Movieimage}" alt="">
                                </div>
                                <div id="overlay" class="absolute flex flex-col transition-all duration-300 backdrop-filter backdrop-blur-[8px] bg-[rgba(0,0,0,0.25)] top-0 left-0 z-20 group-hover:opacity-100 h-full w-full opacity-0 text-white text-center py-5 px-2">
                                    <h1 class="justify-self-center opacity-0 text-3xl font-bold py-5 group-hover:animate-fadeindown">${MovieTitle}</h1>
                                    <div class="flex flex-col items-start mx-4">
                                        <p class="text-start py-3 text-l group-hover:animate-flyin flyin">${movieOverview}</p>
                                        <p class="py-2 text-l group-hover:animate-fadeinup fadeinup"><span >Release Date<span> : ${releaseDate}</span></span></p>
                                        <h3 class="text-yellow-500 text-l px-1 group-hover:animate-fadeinup fadeinup">${movieStars}</h3>
                                        <h3 class="rounded-full w-12 h-12 p-2 bg-transparent border-2 border-green-600 text-white mt-4 group-hover:animate-fadeinup fadeinup">${MovieRate}</h3>
                                    </div>    
                                </div>
                            </div>
                                `)
                        })
                    }
                })
            },
            error: function(xhr, status, error) {
                console.error(status, error);
            },
            beforeSend: function() {
                $('#loading-screen').show();
                $('#content').html('')
            },
            complete: function() {
                $('#loading-screen').hide();
            }
        })
    })


    // homePage and categories
    function displayData(){ $.ajax({
        url: `https://api.themoviedb.org/3/${categoryValue}?api_key=8fc1a988bc6894900dbd51b508cc8127&language=en-US`,
        method: 'GET',
        headers:{
            accept: 'application/json',
        },
        success : function(response) {
            $.each(response, function(index, element){
                if(typeof element == 'object'){
                    $.each(element,function(index2, element2){
                        console.log(element2)
                        Movieimage = checkMovieImage(element2);
                        movieStars = checkMovieVote(element2);
                        movieOverview = checkMovieDesc(element2);
                        releaseDate = checkMovieDate(element2);
                        MovieTitle = checkMovieTitle(element2);
                        MovieRate = element2.vote_average ?? '?';
                        
                        $('#content').append(`
                        <div class="relative w-[90%] sm:w-[45%] md:w-[30%] overflow-hidden group meal-click rounded-lg p-4">
                            <div class="[transform:perspective(1px)_translateZ(0)] transition-all">
                                <img class="h-full w-full rounded-lg group-hover:scale-125 group-hover:rotate-[6deg] duration-300" src="${Movieimage}" alt="">
                            </div>
                            <div id="overlay" class="absolute flex flex-col transition-all duration-300 backdrop-filter backdrop-blur-[8px] bg-[rgba(0,0,0,0.25)] top-0 left-0 z-20 group-hover:opacity-100 h-full w-full opacity-0 text-white text-center py-5 px-2">
                                <h1 class="justify-self-center opacity-0 text-3xl font-bold py-5 group-hover:animate-fadeindown ">${MovieTitle}</h1>
                                <div class="flex flex-col items-start mx-4">
                                    <p class="text-start py-3 text-l group-hover:animate-flyin flyin">${movieOverview}</p>
                                    <p class="py-2 text-l group-hover:animate-fadeinup fadeinup"><span >Release Date<span> : ${releaseDate}</span></span></p>
                                    <h3 class="text-yellow-500 text-l px-1 group-hover:animate-fadeinup fadeinup">${movieStars}</h3>
                                    <h3 class="rounded-full w-12 h-12 p-2 bg-transparent border-2 border-green-600 text-white mt-4 group-hover:animate-fadeinup fadeinup">${MovieRate}</h3>
                                </div>    
                            </div>
                        </div>
                            `)
                    })
                }
            })
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        },
        beforeSend: function() {
            $('#loading-screen').show();
            $('#content').html('')
        },
        complete: function() {
            $('#loading-screen').hide();
        }
    })
}
    // api info validation
    function checkMovieImage(value)
{
    if(value.poster_path == null && value.backdrop_path == null)
    {
        return `./images/default-movie.jpg`;
    }
    else if(value.poster_path == null)
    {
        returb `https://image.tmdb.org/t/p/w500${value.backdrop_path}`;
    }
    else if(value.hasOwnProperty('poster_path'))
    {
        return `https://image.tmdb.org/t/p/w500${value.poster_path}`;
    }
    
}
function checkMovieTitle(value)
{
    if(value.hasOwnProperty('title'))
    {
        return value.title;
    }
    else if(value.hasOwnProperty('original_title'))
    {
            return value.original_title;
    }
}
function checkMovieDesc(value)
{
    if(value.overview == null || value.overview == ''){
        return 'UnKnown'
    }
    else if(value.overview.length > 400)
    {
        return `${value.overview.slice(0,400)}...`;
    }
    else
    {
        return `${value.overview}`;
    }
}
function checkMovieDate(value)
{
    if(value.hasOwnProperty('release_date'))
    {
        return `${value.release_date}`;
    }
    else if(value.hasOwnProperty('first_air_date'))
    {
        return `${value.first_air_date}`;
    }
    else
    {
        return "Release Date UnKnown";
    }
}

function checkMovieVote(value)
{
    let stars= ''
    if(value.vote_average < 1)
    {
        stars = `<i class="fa-solid fa-star "></i>`;
    }
    else if(value.vote_average < 2)
    {
        let term = '';
        stars = term + `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    else if(value.vote_average < 3)
    {
        stars =  `<i class="fa-solid fa-star "></i>`;
    }
    else if(value.vote_average <4)
    {
        let term = '';
        for (let i = 0; i < 1; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term + `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    else if(value.vote_average <5)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term;
    }
    else if(value.vote_average <6)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term + `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    else if(value.vote_average < 7)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 8)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term + `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    else if(value.vote_average < 9)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term;
    }
    else if(value.vote_average < 10)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term + `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    else
    {
        let term = '';
        for (let i = 0; i < 5; i++) {
            term += `<i class="fa-solid fa-star "></i>`;
        }
        stars = term;
    }
    return stars
}

    //sidebar
    $('#drawer-toggle').on('click',function(){
        if(!$('#drawer-toggle').hasClass('closed')){
            $('#drawer-toggle').addClass('closed')
            $('#drawer-toggle').html('<i class="fa-solid fa-bars "></i>');
            $('#drawer-toggle').parent().css('left', '0');
            $('#drawer').css('transform', 'translate(-100%, 0)')
            $('#drawer-categories').slideToggle(300);
            
        }
        else if($('#drawer-toggle').hasClass('closed')){
            $('#drawer-toggle').html('<i class="fa-solid fa-xmark"></i>');
            $('#drawer-toggle').removeClass('closed')
            $('#drawer-toggle').parent().css('left', '256px');
            $('#drawer').css('transform', 'translate(0, 0)')
            setTimeout(function(){$('#drawer-categories').slideToggle(300)}, 500)
            
        }
    })
    $('#drawer-categories').on('click',function(){
        $('#drawer-toggle').html('<i class="fa-solid fa-bars "></i>');
        $('#drawer-toggle').addClass('closed')
        $('#drawer-toggle').parent().css('left', '0');
        $('#drawer').css('transform', 'translate(-100%,0)')
        $('#drawer-categories').slideToggle(300);
        })

    //scroll button
    $('#scrollTopBtn').hide()
    window.addEventListener('scroll', function() {
    if(this.window.scrollY > 250)
    {
        $('#scrollTopBtn').show()
    }
    else{
        $('#scrollTopBtn').hide()
    }
    })
    scrollTopBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    //validation
    let contactId;
let nameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let passValid= false;
let reValid = false;
let nameValue;
let passvalue;
const nameRegex = /[a-z ,.'-]$/i;
const phoneRegex = /01\d{9}/;
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/i;
$('.contact-validation').on('focus',function(eventObject){
        switch (eventObject.target){
            case document.getElementById('name'):
                $('#name').on('keyup', function(e){
                    nameValue = document.getElementById('name').value
                    let code =  e.which;
                    // do nothing if it's an arrow key
                    if(code == 37 || code == 38 || code == 39 || code == 40 || code == 16 || code == 17 || code == 18 || code == 91) {
                        return;
                    }
                    if(nameValue.length < 5){
                            $('#name').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#name').removeClass('text-green-600 border-green-600')
                            $('#name').addClass('text-red-600 border-red-600')
                            $('#name').next().removeClass('text-green-600')
                            $('#name').next().addClass('text-red-600')
                            $('#name').next().html('Name must be at least 5 letters')
                            $('#name').next().fadeIn()
                            nameValid = false
                    }
                    else if(!nameRegex.test(nameValue)){
                            $('#name').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#name').removeClass('text-green-600 border-green-600')
                            $('#name').addClass('text-red-600 border-red-600')
                            $('#name').next().removeClass('text-green-600')
                            $('#name').next().addClass('text-red-600')
                            $('#name').next().html('Name must contain only letters')
                            $('#name').next().fadeIn()
                            nameValid = false
                    }
                    else {
                            $('#name').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#name').removeClass('text-red-600 border-red-600')
                            $('#name').addClass('text-green-600 border-green-600')
                            $('#name').next().removeClass('text-red-600')
                            $('#name').next().addClass('text-green-600')
                            $('#name').next().html('Valid Name')
                            $('#name').next().fadeIn()
                            nameValid = true
                    }
                    $('#name').on('focusout',function (){
                        setTimeout(()=>{
                            $('#name').next().remove()
                            $('#name').removeClass('text-green-600 border-green-600')
                            $('#name').removeClass('text-red-600 border-red-600')
                            $('#name').addClass('border-[#ced4da] text-[#ced4da]');
                        }, 1000)
                    })

                })

            break;
            case document.getElementById('email'):
                let validationEmail = false;
                $('#email').on('keyup', function(e){
                    let code =  e.which;
                    // do nothing if it's an arrow key
                    if(code == 37 || code == 38 || code == 39 || code == 40 || code == 16 || code == 17 || code == 18 || code == 91) {
                        return;
                    }
                    validationEmail = emailRegex.test(document.getElementById('email').value);
                    switch(validationEmail){
                        case false:
                            $('#email').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#email').removeClass('text-green-600 border-green-600')
                            $('#email').addClass('text-red-600 border-red-600')
                            $('#email').next().removeClass('text-green-600')
                            $('#email').next().addClass('text-red-600')
                            $('#email').next().html('invalid email')
                            $('#email').next().fadeIn()
                            emailValid = false;
                            break;
                        case true:
                            $('#email').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#email').removeClass('text-red-600 border-red-600')
                            $('#email').addClass('text-green-600 border-green-600')
                            $('#email').next().removeClass('text-red-600')
                            $('#email').next().addClass('text-green-600')
                            $('#email').next().html('valid email')
                            $('#email').next().fadeIn()
                            emailValid= true;
                        break;
                    }    
                })
                $('#email').on('focusout',function (){
                    setTimeout(()=>{
                        $('#email').next().remove()
                        $('#email').removeClass('text-green-600 border-green-600')
                        $('#email').removeClass('text-red-600 border-red-600')
                        $('#email').addClass('border-[#ced4da] text-[#ced4da]');
                    }, 1000)
                })
                
            break;
            case document.getElementById('phone'):
                $('#phone').on('keyup',function(e){
                    let code =  e.which;
                    // do nothing if it's an arrow key
                    if(code == 37 || code == 38 || code == 39 || code == 40 || code == 16 || code == 17 || code == 18 || code == 91) {
                        return;
                    }
                    if (!phoneRegex.test(document.getElementById('phone').value)) {
                            $('#phone').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#phone').removeClass('text-green-600 border-green-600')
                            $('#phone').addClass('text-red-600 border-red-600')
                            $('#phone').next().removeClass('text-green-600')
                            $('#phone').next().addClass('text-red-600')
                            $('#phone').next().html('Invalid phone number')
                            $('#phone').next().fadeIn()
                        phoneValid = false;
                    }
                    else{
                            $('#phone').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#phone').removeClass('text-red-600 border-red-600')
                            $('#phone').addClass('text-green-600 border-green-600')
                            $('#phone').next().removeClass('text-red-600')
                            $('#phone').next().addClass('text-green-600')
                            $('#phone').next().html('Valid phone number')
                            $('#phone').next().fadeIn()
                            phoneValid = true;
                    }
                    
                })
                $('#phone').on('focusout',function (){
                    setTimeout(()=>{
                        $('#phone').next().remove()
                        $('#phone').removeClass('text-green-600 border-green-600')
                        $('#phone').removeClass('text-red-600 border-red-600')
                        $('#phone').addClass('border-[#ced4da] text-[#ced4da]');
                    }, 1000)
                })
                break;
            case document.getElementById('age'):
                $('#age').on('keyup',function(e){ 
                    if (+document.getElementById('age').value < 16){
                            $('#age').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#age').removeClass('text-green-600 border-green-600')
                            $('#age').addClass('text-red-600 border-red-600')
                            $('#age').next().removeClass('text-green-600')
                            $('#age').next().addClass('text-red-600')
                            $('#age').next().html('Must be over +16')
                            $('#age').next().fadeIn()
                        ageValid = false;
                    }
                    else{
                            $('#age').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#age').removeClass('text-red-600 border-red-600')
                            $('#age').addClass('text-green-600 border-green-600')
                            $('#age').next().removeClass('text-red-600')
                            $('#age').next().addClass('text-green-600')
                            $('#age').next().html('Valid age')
                            $('#age').next().fadeIn()
                            ageValid = true;
                    }
                    
                })
                $('#age').on('focusout',function (){
                    setTimeout(()=>{
                        $('#age').next().remove()
                        $('#age').removeClass('text-green-600 border-green-600')
                        $('#age').removeClass('text-red-600 border-red-600')
                        $('#age').addClass('border-[#ced4da] text-[#ced4da]');
                    }, 1000)
                })
            break;
            case document.getElementById('password'):
                $('#password').on('keyup', function(e){
                    passValue = document.getElementById('password').value
                    let code =  e.which;
                    // do nothing if it's an arrow key
                    if(code == 37 || code == 38 || code == 39 || code == 40 || code == 16 || code == 17 || code == 18 || code == 91) {
                        return;
                    }
                    if(passValue.length < 8){
                            $('#password').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#password').removeClass('text-green-600 border-green-600')
                            $('#password').addClass('text-red-600 border-red-600')
                            $('#password').next().removeClass('text-green-600')
                            $('#password').next().addClass('text-red-600')
                            $('#password').next().html('Password must be at least 8 characters')
                            $('#password').next().fadeIn()
                            passValid = false;
                    }
                    else if(!passwordRegex.test(passValue)){
                            $('#password').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#password').removeClass('text-green-600 border-green-600')
                            $('#password').addClass('text-red-600 border-red-600')
                            $('#password').next().removeClass('text-green-600')
                            $('#password').next().addClass('text-red-600')
                            $('#password').next().html('Must contain a special characters, letters and numbers')
                            $('#password').next().fadeIn()
                            passValid = false;
                    }
                    else {
                            $('#password').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#password').removeClass('text-red-600 border-red-600')
                            $('#password').addClass('text-green-600 border-green-600')
                            $('#password').next().removeClass('text-red-600')
                            $('#password').next().addClass('text-green-600')
                            $('#password').next().html('Valid password')
                            $('#password').next().fadeIn()
                            passValid = true;
                    }
                    $('#password').on('focusout',function (){
                        setTimeout(()=>{
                            $('#password').next().remove()
                            $('#password').removeClass('text-green-600 border-green-600')
                            $('#password').removeClass('text-red-600 border-red-600')
                            $('#password').addClass('border-[#ced4da] text-[#ced4da]');
                        }, 1000)
                    })
                })
            break;
            case document.getElementById('re-password'):
                $('#re-password').on('keyup',function(e){ 
                    if (!document.getElementById('re-password').value == document.getElementById('password').value){
                            $('#re-password').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#re-password').removeClass('text-green-600 border-green-600')
                            $('#re-password').addClass('text-red-600 border-red-600')
                            $('#re-password').next().removeClass('text-green-600')
                            $('#re-password').next().addClass('text-red-600')
                            $('#re-password').next().html('Password Doesn\'t match')
                            $('#re-password').next().fadeIn()
                            reValid = false;
                    }
                    else{
                            $('#re-password').removeClass('border-[#ced4da] text-[#ced4da]');
                            $('#re-password').removeClass('text-red-600 border-red-600')
                            $('#re-password').addClass('text-green-600 border-green-600')
                            $('#re-password').next().removeClass('text-red-600')
                            $('#re-password').next().addClass('text-green-600')
                            $('#re-password').next().html('')
                            $('#re-password').next().fadeIn()
                            reValid = true;
                    }
                    
                })
                $('#re-password').on('focusout',function (){
                    setTimeout(()=>{
                        $('#re-password').next().remove()
                        $('#re-password').removeClass('text-green-600 border-green-600')
                        $('#re-password').removeClass('text-red-600 border-red-600')
                        $('#re-password').addClass('border-[#ced4da] text-[#ced4da]');
                    }, 1000)
                })
            break;
        }
let preventSubmition = true;
$('.contact-validation').on('focusout',function(){
    if(nameValid == true && emailValid == true && phoneValid == true && ageValid == true && passValid == true && reValid == true){
        preventSubmition = false
        $('#submit-btn').css({'border-color': 'green', "color": "green"})
        $('#submit-btn').addClass('hover:bg-red-800 hover:text-white cursor-pointer animate-shakeupdown')
        setTimeout(() => {
        $('#submit-btn').css({'border-color': '', "color": ""})
        $('#submit-btn').removeClass('animate-shakeupdown')
        }, 2000);
    }
    else{
        preventSubmition = true
        $('#submit-btn').addClass('animate-shake')
        setTimeout(() => {
        $('#submit-btn').removeClass('animate-shake')
        }, 1000);
    }
})
    $('.contact-validation').on('submit', function(event){
        if(preventSubmition){event.preventDefault();}
    })    
})
})