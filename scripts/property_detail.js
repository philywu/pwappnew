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
    app.registerEvents = function() {
        const btnSubmit = document.getElementById("b_submit");
        btnSubmit.addEventListener("click", function(a){
            
            const txtPropertyAddress = document.getElementById("i_adr1");
            app.post();
            console.log("submit click",txtPropertyAddress.value);

        })
    }
    app.post  = async function() {
        const rawResponse = await fetch('http://localhost:8000/api/properties', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({a: 1, address: 'Textual content'})
        });
        const content = await rawResponse.json();
      
        console.log(content);
    }
    
    app.callJson = function() {
        console.log("call json");
        const url = "http://localhost:8000/api/properties";
        // $.getJSON("http://localhost:8000/api/properties",function (result){
        //     $.each(result, function(i, field){
        //         console.log("item:" ,field);
        //     });
        // })
        // const cardList = document.getElementById("cardlist");
        // fetch(url)
        //     .then(function(response) { 
        //         return response.json();
        //     })
        //     .then(function(myJson) {
        //         console.log(myJson);
        //         for (let item of myJson){
                    
        //             cardList.insertAdjacentHTML('beforeend',
        //                 (new PropertyCard(item)).html()               
        //             );
        //         }             
        //     });

    };
    app.registerEvents();
    app.callJson();
   // var con = $(".container");
   // console.log("here", con);
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                .register('../service-worker.js')
                .then(function() { console.log('Service Worker Registered'); });
    }
})();