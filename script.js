let currentMap;
let latamMap = document.getElementById('LATAM');
let uyPath = document.getElementById('UY');
let titulo = document.getElementById('texttitulo');
let lineas = document.querySelectorAll('.linea');

let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 1
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS, timelineL;
let closest, isScrolling, textCoord;

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPercent = Math.round(window.scrollY / maxScroll * 100);
    
    isScrolling = true;
};
window.onscrollend = () => {
    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function preload() {
    currentMap = latamMap;
}

function setup(){
    //textCoord = createElement('label', null);
    //textCoord.position(0, 0)
    //POS x
    timelineX = new Timeline();
    //CENTROAMERICA
    timelineX.addKeyframe(0.5, 750);
    
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 0));

    //POS Y
    timelineY = new Timeline();
    //CENTROAMERICA
    timelineY.addKeyframe(0.5, 1050);
    //URUGUAY
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 910));

    //ZOOM
    timelineZ = new Timeline();
    //CENTROAMERICA
    timelineZ.addKeyframe(0.5, 0.2);
    //URUGUAY

    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 1));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.5, 0);
    timelineS.addKeyframe(1, 0);

    //LINEAS
    let totalLength;
    for (let linea of lineas) {
        linea.style.strokeDasharray = linea.getTotalLength()
        totalLength = linea.getTotalLength();
    }
    timelineL = new Timeline();
    timelineL.addKeyframe(0.7, totalLength)
    timelineL.setAllValues(new Keyframe(0, totalLength), new Keyframe(1, 0));
    
}

function draw(){
    let viewBoxArgs = timelineX.valueAt(scrollPercent*10) +' '+ timelineY.valueAt(scrollPercent*10)  +' '+ 1920 * timelineZ.valueAt(scrollPercent*10) + ' ' + 2722.72 * timelineZ.valueAt(scrollPercent*10)
    currentMap.setAttribute('viewBox', viewBoxArgs);
    for (let linea of lineas) {
        linea.style.strokeDashoffset = Number(timelineL.valueAt(scrollPercent*10));
    }
    //textCoord.html(viewBoxArgs);
    if (scrollPercent > 60) {  
        uyPath.style.opacity = map(scrollPercent, 60, 100, 0, 1, true);
    }

   
    timelineS.currentTime = scrollPercent * 0.01;
    console.log(scrollPercent)
    if (!isScrolling && scrollPercent < 70) { 
        timelineS.currentTime = scrollPercent * 0.01;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
    
}

function calcularScrollYSegunPercent(sPercent){
    let maxScroll = body.clientHeight - window.innerHeight;
    return Math.round((sPercent / 100) * maxScroll);
}
