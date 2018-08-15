import {
    PropertyCard
} from '../module/card.js';

(function () {
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
    app.init = function () {
        if (window.File && window.FileList && window.FileReader) {
            document.getElementById('files').addEventListener("change", function (event) {
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
                                let files = document.getElementById('files').files;
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
            let form =  document.getElementById("f_upload")
            form.addEventListener("submit",function (ev){
               
                let files = document.getElementById('files').files;
                let images = document.getElementsByClassName('image-container');
                let oData = new FormData(form);
                Array.from(files).forEach((f,i) => {
                    Array.from(images).forEach( (imgDiv) => {
                        let remainFileName = imgDiv.getAttribute("name");
                        if (remainFileName && f.name.includes(remainFileName)) {
                            //console.log(imgDiv);
                            oData.append(`photo`, f)
                           // uploadForm.reset();

                        }

                    });
                   
                })
                //oData.append("photo",files[0]);
                oData.delete("photo1");
                let oReq = new XMLHttpRequest();
                oReq.open("POST", "http://localhost:8000/upload", true);
                oReq.onload = function(oEvent) {
                  if (oReq.status == 200) {
                    //oOutput.innerHTML = "Uploaded!";
                    console.log("uploaded");
                  } else {
                   // oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
                  console.log("error");
                }
                };
              
                oReq.send(oData);
                ev.preventDefault();  
            } ,false)
        }
    };
    app.init();
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