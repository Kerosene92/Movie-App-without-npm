/// <reference types="../../node_modules/@types/jquery"/>
$(function (){
    const req1 = $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=`,
        method: 'GET',
        success: function(response) {
            $.each(response, function(index, element){
                $.each(element, function(index, element2){
                    $("#main-page").append(`<div id-meal="${element2.idMeal}" class="relative overflow-hidden group">
                        <img class="h-auto max-w-full rounded-lg " src="${element2.strMealThumb}" alt="">
                        <div class="rounded-lg absolute transition-all duration-500 left-0 top-full z-20 group-hover:top-0 bg-[#f9f6f6] h-full w-full opacity-80">
                            <h3 class="relative top-1/2 left-4 text-black -trnaslate-y-1/2">${element2.strMeal}</h3>
                        </div>
                    </div>`)
                })
            })
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        },
        beforeSend: function() {
            $('#loading-screen').show();
        },
        complete: function() {
            $('#loading-screen').hide();
        }
    });
    
    let i=1;
    $('#clicked').on('click',function(){
        switch(i%2){
            case 0:
                $('#drawer-categories').slideToggle(500);
                i++;
                break;
            case 1:
                setTimeout(function(){$('#drawer-categories').slideToggle(600);}, 1500)
                i++;
                break;
        }
    })
})
