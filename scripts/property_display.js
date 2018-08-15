(function () {
    'use strict';
    console.log("initial")
    //var uploadUrl = 'http://localhost:8000/upload';
    var uploadUrl = 'http://219.88.233.164:4000/api/property';
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
    app.registerEvents = function () {
        const btnSubmit = document.getElementById("b_submit");
        const form = document.getElementById("f_upload");
        btnSubmit.addEventListener("click", function (a) {

            const txtPropertyAddress = document.getElementById("i_adr1");
            console.log("submit click", txtPropertyAddress.value);

            //app.post();
            app.upload(form);
           // form.submit();

        });

       
        //form.addEventListener("submit", async function (ev) {
                //  ev.preventDefault();
                // let files = document.getElementById('upload-photo').files;
                // let images = document.getElementsByClassName('image-container');
                // let oData = new FormData(form);
                // Array.from(files).forEach((f, i) => {
                //     Array.from(images).forEach((imgDiv) => {
                //         let remainFileName = imgDiv.getAttribute("name");
                //         if (remainFileName && f.name.includes(remainFileName)) {
                //             //console.log(imgDiv);
                //             oData.append(`photo`, f)
                //             // uploadForm.reset();

                //         }

                //     });

                // });
                // oData.delete("photo1");
                // //oData.append("photo",files[0]);
                // const rawResponse = await fetch('http://localhost:8000/upload', {
                //     method: 'POST',
                //     body:oData
                // });
                // const content = await rawResponse.json();
                // console.log(content);
                // oData.delete("photo1");
                // let oReq = new XMLHttpRequest();
                // oReq.open("POST", "http://localhost:8000/upload", true);
                // oReq.onload = function (oEvent) {
                //     if (oReq.status == 200) {
                //         //oOutput.innerHTML = "Uploaded!";
                //         console.log("uploaded");
                //     } else {
                //         // oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
                //         console.log("error");
                //     }
                // };

                //oReq.send(oData);
                
           // }, false);
        
        // for file upload
        if (window.File && window.FileList && window.FileReader) {
            document.getElementById('upload-photo').addEventListener("change", function (event) {
                console.log(event.target.files);
                let files = event.target.files;
                let output = document.getElementById("result");


                for (let file of files) {
                    if (file.type.match('image.*')) {

                        let picReader = new FileReader();

                        picReader.addEventListener("load", function (event) {
                            let picFile = event.target;

                            let div = document.createElement("div");
                            div.className = 'image-container';
                            div.setAttribute('name', file.name);

                            let img = document.createElement("img");
                            img.className = "thumbnail";
                            img.src = window.URL.createObjectURL(file);
                            img.height = 60;
                            img.onload = function () {
                                window.URL.revokeObjectURL(this.src);
                            }
                            div.appendChild(img);
                            let ico = document.createElement("i");
                            ico.innerText = 'X';
                            ico.className = 'material-icons';

                            ico.addEventListener("click", function () {
                                let uploadForm = document.getElementById("f_upload");
                                let imgDiv = this.parentElement;
                                let files = document.getElementById('upload-photo').files;
                                let removedFileName = imgDiv.getAttribute("name");
                                for (let file of files) {
                                    if (removedFileName && file.name.includes(removedFileName)) {
                                        console.log(file);
                                        // uploadForm.reset();

                                    }


                                }
                                imgDiv.remove();
                            });




                            div.appendChild(ico);
                            output.insertBefore(div, null);

                        });
                        picReader.readAsDataURL(file);
                    } else {
                        // not an image
                    }
                }
            });
        }
            
    }
    app.upload = async function(form) {
        
        let files = document.getElementById('upload-photo').files;
        let images = document.getElementsByClassName('image-container');
        let oData = new FormData(form);

        //organize form data 
        const jsonData = {
            "$class": "org.Micontec.pm.Property",
            "address" : document.getElementById("i_adr1").value,
            "PM" : document.getElementById("i_pm1").value,
            "landlord" : document.getElementById("i_ll1").value,
            "tenant" : document.getElementById("i_tn1").value,
            "propertyId": "",          
            "city": document.getElementById("i_city").value,
            "isPMManaged": true,
            "PMStartDate": "2018-07-25T07:48:52.107Z"
            
        }

        
        //console.log("json",JSON.stringify(jsonData));
        oData.append('propertyInfo',JSON.stringify(jsonData));
        oData.append('propertyID','');
        // file data
        Array.from(files).forEach((f, i) => {
            Array.from(images).forEach((imgDiv) => {
                let remainFileName = imgDiv.getAttribute("name");
                if (remainFileName && f.name.includes(remainFileName)) {
                    //console.log(imgDiv);
                    oData.append('file', f)
                    // uploadForm.reset();

                }

            });

        });
        oData.delete("photo1");
        //oData.append("photo",files[0]);
        const rawResponse = await fetch(uploadUrl, {
            method: 'POST',
            body:oData
        });
       const content = await rawResponse.json();
        console.log("response",content);
       // ev.preventDefault();
    }
    app.post = async function () {
        const rawResponse = await fetch('http://localhost:8000/api/properties', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                a: 1,
                address: 'Textual content'
            })
        });
        const content = await rawResponse.json();

        console.log(content);
    }

    app.callJson = function () {
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
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
})();