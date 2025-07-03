let zoom1 = document.getElementById('Zoom1');
let zoom2 = document.getElementById('Zoom2');
let zoom3 = document.getElementById('Zoom3');
let zoom4 = document.getElementById('Zoom4');
let zoom1EN = document.getElementById('Zoom1-EN');
let zoom2EN = document.getElementById('Zoom2-EN');
let zoom3EN = document.getElementById('Zoom3-EN');
let zoom4EN = document.getElementById('Zoom4-EN');

function fade(zoomLevel){
    zoomLevel.style.opacity = 0;
}

function show(zoomLevel){
    zoomLevel.style.opacity = 1;
}