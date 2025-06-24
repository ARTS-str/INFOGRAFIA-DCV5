let currentMap;
let latamMap = document.getElementById('LATAM');
let titulo = document.getElementById('texttitulo');
let lineas = document.getElementById('LINEAS');
let lineasChild = lineas.children;
let debug = document.getElementById('debug');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 0;
let scrollPos = 0;
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS, timelineL, timelineCol;
let closest, isScrolling, textCoord;

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
    let scrollPercentTimesTen = Math.trunc(scrollPos * 1000);
    
    let viewBoxArgs = timelineX.valueAt(scrollPercentTimesTen) +' '+ timelineY.valueAt(scrollPercentTimesTen)  +' '+ 1920.04 * timelineZ.valueAt(scrollPercentTimesTen) + ' ' + 3612.6 * timelineZ.valueAt(scrollPercentTimesTen)
    currentMap.setAttribute('viewBox', viewBoxArgs);

    if (scrollPercent >= 30 && scrollPercent < 45) {
        show(zoom2);
    }else{
        fade(zoom2);
    }
    animateLines();
    
    if (!isScrolling) { 
        timelineS.currentTime = scrollPos;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
    let colors = ['#a87d6f', '#d6d6d6', '#7d4649'];
    body.style.backgroundColor = colors[round(timelineCol.valueAt(scrollPercentTimesTen))];

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
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '0ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '250ms', '0ms');
                    break;
                case 1:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '0ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '250ms', '0ms')
                    
                    break;
                case 2:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '0ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '250ms', '0ms')
                    
                    break;
                case 3:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '250ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '250ms')
                    
                    break;
                case 4:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '250ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '250ms')
                    
                    break;
                case 5:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '250ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', '500ms', '250ms')
                    
                    break;
                case 6:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '500ms')
                    
                    break;
                case 7:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '500ms')
                    
                    break;
                case 8:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '500ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '750ms', '500ms')
                    
                    break;
                case 9:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '1000ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '1250ms', '1000ms')
                    
                    break;
                case 10:
                    setLineTransparency(lineasChild[lineaI], 'opacity', '100ms', '1000ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', '1250ms', '1000ms')
                    
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

function getTimingWithIndex(index){
    switch (index) {
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
