let currentMap;
let latamMap = document.getElementById('LATAM');
let uyPath = document.getElementById('UY');
let titulo = document.getElementById('texttitulo');
let lineas = document.getElementById('LINEAS');
let lineasChild = lineas.children;
let debug = document.getElementById('debug');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 0;
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS, timelineL, timelineCol;
let closest, isScrolling, textCoord;


window.scrollTo({top: -50, left: 0, behavior: 'smooth'});

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPercent = Math.min(100, Math.max(0, Math.round(window.scrollY / maxScroll * 100)));
    
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
    noCanvas();
    //POS x
    timelineX = new Timeline();
    //CENTROAMERICA
    timelineX.addKeyframe(0.15, 622);
    //LATAM
    timelineX.addKeyframe(0.3, 481);
    //URUGUAY
    timelineX.addKeyframe(0.45, 1025);
    //CHUY
    timelineX.addKeyframe(0.6, 1079);
    
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 0));

    //POS Y
    timelineY = new Timeline();
    //CENTROAMERICA
    timelineY.addKeyframe(0.15, 1936);
    //LATAM
    timelineY.addKeyframe(0.3, 1936);
    //URUGUAY
    timelineY.addKeyframe(0.45, 2360);
    //CHUY
    timelineY.addKeyframe(0.6, 2386);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 2700));

    //ZOOM
    timelineZ = new Timeline();
    //CENTROAMERICA
    timelineZ.addKeyframe(0.15, 0.40);
    //LATAM
    timelineZ.addKeyframe(0.3, 0.60);
    //URUGUAY
    timelineZ.addKeyframe(0.45, 0.07);
    //URUGUAY
    timelineZ.addKeyframe(0.6, 0.03);

    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 1));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.15, 0);
    timelineS.addKeyframe(0.3, 0);
    timelineS.addKeyframe(0.45, 0);
    timelineS.addKeyframe(0.6, 0);
    timelineS.addKeyframe(0.75, 0);
    timelineS.addKeyframe(1, 0);

    //LINEAS
    //let totalLength;
    //for (let linea of lineas) {
    //    linea.style.strokeDasharray = linea.getTotalLength()
    //    totalLength = linea.getTotalLength();
    //}
    //timelineL = new Timeline();
    //timelineL.addKeyframe(0.7, totalLength)
    //timelineL.setAllValues(new Keyframe(0, totalLength), new Keyframe(1, 0));
    
    //COLORES DE FONDO
    timelineCol = new Timeline();
    timelineCol.addKeyframe(0.1, 1)
    timelineCol.setAllValues(new Keyframe(0, 0), new Keyframe(1, 2));

}

function draw(){
    //debug.innerHTML = scrollPercent;
    let scrollPercentTimesTen = scrollPercent*10;
    let viewBoxArgs = timelineX.valueAt(scrollPercentTimesTen) +' '+ timelineY.valueAt(scrollPercentTimesTen)  +' '+ 1920.04 * timelineZ.valueAt(scrollPercentTimesTen) + ' ' + 3612.6 * timelineZ.valueAt(scrollPercentTimesTen)
    currentMap.setAttribute('viewBox', viewBoxArgs);
    //for (let linea of lineas) {
    //    linea.style.strokeDashoffset = Number(timelineL.valueAt(scrollPercentTimesTen));
    //}
    //textCoord.html(viewBoxArgs);
    if (scrollPercent > 60) {  
        uyPath.style.opacity = map(scrollPercent, 60, 100, 0, 1, true);
    }

    if (scrollPercent < 30 || scrollPercent > 35){
        lineas.style.opacity = '0';
        for (const linea of lineasChild) {
            linea.style.animationDuration = '0';
        }
    }else{
        lineas.style.opacity = '1';
        for (let lineaI = 0; lineaI < lineasChild.length; lineaI++) {    
            lineasChild[lineaI].style.opacity = '1';
            lineasChild[lineaI].style.animationDuration = '250ms';
        }
        

    }
    

    timelineS.currentTime = scrollPercent * 0.01;
    if (!isScrolling) { 
        timelineS.currentTime = scrollPercent * 0.01;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
    let colors = ['#a87d6f', '#d6d6d6', '#7d4649'];
    body.style.backgroundColor = colors[round(timelineCol.valueAt(scrollPercentTimesTen))];

}

function getTimingWithID(elementId){
    switch (elementId) {
        case 1:
            return "250ms";
        case 2:
            
            return "500ms";
        case 3:
            
            return "750ms";
        case 4:
            
            return "1s";
        case 5:
            
            return "1250ms";
    
        default:
            return "0";
    }
}

function calcularScrollYSegunPercent(sPercent){
    let maxScroll = body.clientHeight - window.innerHeight;
    return Math.round((sPercent / 100) * maxScroll);
}
