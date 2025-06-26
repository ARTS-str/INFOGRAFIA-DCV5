let currentMap;
let latamMap = document.getElementById('LATAM');
let UYPre = document.getElementById('UY');
let UY = document.getElementById('URUGUAY_c_borde');
let titulo = document.getElementById('texttitulo');
let lineas = document.getElementById('LINEAS');
let sudamerica = document.getElementById('SUDAMERICA');
let CENTROAMERICA = document.getElementById('CENTROAMERICA');
let paisesSudamericanos = sudamerica.children;
let lineasChild = lineas.children;
let debug = document.getElementById('debug');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 0;
let scrollPos = 0;
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS, timelineL, timelineCol;
let closest, isScrolling, textCoord;
let isAutoScrolling = true;

window.scrollTo({top: -50, left: 0, behavior: 'smooth'});

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPos = window.scrollY / maxScroll;
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
    //CONTEXTO
    timelineX.addKeyframe(0.11, 0);
    timelineX.addKeyframe(0.15, 0);
    //CENTROAMERICA
    timelineX.addKeyframe(0.22, 334);
    timelineX.addKeyframe(0.26, 334);
    //LATAM
    timelineX.addKeyframe(0.33, 206);
    timelineX.addKeyframe(0.37, 206);
    //UY
    timelineX.addKeyframe(0.44, 943);
    timelineX.addKeyframe(0.48, 943);
    //CHUY
    timelineX.addKeyframe(0.55, 1031);
    timelineX.addKeyframe(0.59, 1031);
    //TESTIMONIOS
    timelineX.addKeyframe(0.66, 0);
    
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 0));

    //POS Y
    timelineY = new Timeline();
    //CONTEXTO
    timelineY.addKeyframe(0.11, 904);
    timelineY.addKeyframe(0.15, 904);
    //CENTROAMERICA
    timelineY.addKeyframe(0.22, 1886);
    timelineY.addKeyframe(0.26, 1886);
    //LATAM
    timelineY.addKeyframe(0.33, 1816);
    timelineY.addKeyframe(0.37, 1816);
    //UY
    timelineY.addKeyframe(0.44, 2390);
    timelineY.addKeyframe(0.47, 2390);
    //CHUY
    timelineY.addKeyframe(0.55, 2424);
    timelineY.addKeyframe(0.59, 2424);
    //TESTIMONIOS
    timelineY.addKeyframe(0.66, 2706);
    timelineY.addKeyframe(0.67, 2706);
    //SITUACION
    timelineY.addKeyframe(0.77, 3607);
    timelineY.addKeyframe(0.81, 3607);
    //CONCLUSION
    timelineY.addKeyframe(0.88, 4508);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 4508));

    //ZOOM
    timelineZ = new Timeline();
    //CONTEXTO
    timelineZ.addKeyframe(0.11, 1);
    timelineZ.addKeyframe(0.15, 1);
    //CENTROAMERICA
    timelineZ.addKeyframe(0.22, 0.57);
    timelineZ.addKeyframe(0.26, 0.57);
    //LATAM
    timelineZ.addKeyframe(0.33, 0.81);
    timelineZ.addKeyframe(0.37, 0.81);
    //URUGUAY
    timelineZ.addKeyframe(0.44, 0.1);
    timelineZ.addKeyframe(0.48, 0.1);
    //CHUY
    timelineZ.addKeyframe(0.55, 0.04);
    timelineZ.addKeyframe(0.59, 0.04);
    //TESTIMONIOS
    timelineZ.addKeyframe(0.66, 1);

    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 1));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.11, 0);
    timelineS.addKeyframe(0.22, 0);
    timelineS.addKeyframe(0.33, 0);
    timelineS.addKeyframe(0.44, 0);
    timelineS.addKeyframe(0.55, 0);
    timelineS.addKeyframe(0.66, 0);
    timelineS.addKeyframe(0.77, 0);
    timelineS.addKeyframe(0.88, 0);
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
    timelineCol.addKeyframe(0.11, 0);
    timelineCol.addKeyframe(0.22, 1);
    timelineCol.addKeyframe(0.55, 1);
    timelineCol.addKeyframe(0.66, 0);
    timelineCol.setAllValues(new Keyframe(0, 0), new Keyframe(1, 0));

}

function draw(){
    let scrollPercentTimesTen = Math.trunc(scrollPos * 1000);
    
    let viewBoxArgs = timelineX.valueAt(scrollPercentTimesTen) +' '+ timelineY.valueAt(scrollPercentTimesTen)  +' '+ 1920 * timelineZ.valueAt(scrollPercentTimesTen) + ' ' + 5409.41 * timelineZ.valueAt(scrollPercentTimesTen)
    currentMap.setAttribute('viewBox', viewBoxArgs);
    if (scrollPercent >= 22 && scrollPercent < 33) {
        show(zoom1);
        show(sudamerica);
        show(CENTROAMERICA);
    }else{
        fade(zoom1);
    }
    if (scrollPercent >= 33 && scrollPercent < 44) {
        fade(sudamerica);
        fade(CENTROAMERICA);
        show(zoom2);
        show(UYPre);
    }else{
        fade(zoom2);
    }
    if (scrollPercent >= 44 && scrollPercent < 55) {
        fade(UYPre);
        show(zoom3);
        show(UY);
    }else{
        fade(zoom3);
        fade(UY);
    }
    if (scrollPercent >= 55 && scrollPercent < 66) {
        show(zoom4);
    }else{
        fade(zoom4);
    }
    animateLines();
    if (!isScrolling && isAutoScrolling) { 
        timelineS.currentTime = scrollPos;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
    let colors = ['#291011', '#d6d6d6'];
    body.style.backgroundColor = colors[round(timelineCol.valueAt(scrollPercentTimesTen))];
    console.log(window.scrollY)
}

function setLineAnimation(lineToChange, animationName, animationDuration, animationDelay) {
    lineToChange.style.animationName = animationName;
    lineToChange.style.animationDuration = animationDuration;
    lineToChange.style.animationDelay = animationDelay;
}
function setLineTransparency(lineToChange, propertyName, transitionDuration, transitionDelay) {
    lineToChange.style.transitionProperty = propertyName;
    lineToChange.style.transitionDuration = transitionDuration;
    lineToChange.style.transitionDelay = transitionDelay;
}
function animateLines(){
    
    if (scrollPercent >= 30 && scrollPercent < 45) {
        for (let lineaI = 0; lineaI < lineasChild.length; lineaI++) {
            switch (lineaI) {
                case 0:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '250ms', '500ms');
                    break;
                case 1:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '250ms', '500ms')
                    
                    break;
                case 2:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '250ms', '500ms')
                    
                    break;
                case 3:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 4:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 5:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 6:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 7:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 8:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '750ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '750ms')
                    
                    break;
                case 9:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '1000ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '1000ms')
                    
                    break;
                case 10:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '1000ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '1000ms')
                    
                    break;
                case 11:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '1000ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '1000ms')
                    
                    break;
                default:
                    break;
            }
            lineasChild[lineaI].style.opacity = 1;
        }
    } else {
        for (let lineaI = 0; lineaI < lineasChild.length; lineaI++) {
            setLineTransparency(lineasChild[lineaI], 'opacity', '0ms', '0ms');
            setLineAnimation(lineasChild[lineaI], 'none', '0ms', '0ms')
            lineasChild[lineaI].style.opacity = 0;
        }
        
    }
}

function calcularScrollYSegunPercent(sPercent){
    let maxScroll = body.clientHeight - window.innerHeight;
    return Math.round((sPercent / 100) * maxScroll);
}

function escrolearA(posicionY) {
    console.log(posicionY, isAutoScrolling);
    isAutoScrolling = false;
    window.scrollTo({top: posicionY, left: 0, behavior: 'smooth'});
    setTimeout(() => {
        isAutoScrolling = true;
    }, 50);
}