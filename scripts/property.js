import { PropertyCard} from '../module/card.js';

(function() {
    'use strict';
    console.log("initial")
    var app = {
      isLoading: true,
      visibleCards: {},
      selectedCities: [],
      spinner: document.querySelector('.loader'),
      cardTemplate: document.querySelector('.cardTemplate'),
      container: document.querySelector('.main'),
      addDialog: document.querySelector('.dialog-container'),
      daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
    app.callJson = function() {
        console.log("call json");
        const url = "http://localhost:8000/api/properties";
        // $.getJSON("http://localhost:8000/api/properties",function (result){
        //     $.each(result, function(i, field){
        //         console.log("item:" ,field);
        //     });
        // })

       
        const cardList = document.getElementById("cardlist");
        fetch(url)
            .then(function(response) { 
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                for (let item of myJson){
                    
                    cardList.insertAdjacentHTML('beforeend',
                        (new PropertyCard(item)).html()               
                    );
                }             
            });

    };
    app.callJson();
    document.getElementById("btnTask").addEventListener("click",function() {
        console.log("task clicked");
        window.location.assign("upload_test.html")
    });
   // var con = $(".container");
   // console.log("here", con);
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                .register('../service-worker.js')
                .then(function() { console.log('Service Worker Registered'); });
    }
})();