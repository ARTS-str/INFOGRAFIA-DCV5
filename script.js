let latamMap = document.getElementById('LATAM');
let uyPath = document.getElementById('UY');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 1
let maxScale = 10;

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPercent = window.scrollY / maxScroll * 100;

};

function setup(){

}

function draw(){

    scaleTransform = map(scrollPercent, 1, 100, 1, maxScale);
    let x = map(scrollPercent*2, 1, 100, 0, 250, true);
    let y = map(scrollPercent*2, 1, 100, 0, 360, true);
    latamMap.setAttribute('viewBox', x +' '+ y  +' '+ 370 * 1/scaleTransform + ' ' + 500 * 1/scaleTransform);
    uyPath.style.opacity = map(scrollPercent*2, 0, 100, 0, 1, true);

}