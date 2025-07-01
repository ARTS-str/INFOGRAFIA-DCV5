let currentMap;
let latamMap = document.getElementById('LATAM');
let sudamericaMarron = document.getElementById('SUDAMERICA-MARRON');
let centroamericaMarron = document.getElementById('CENTROAMERICA-MARRON');
let UYPre = document.getElementById('UY');
let UY = document.getElementById('URUGUAY_c_borde');
let UY_Dept = document.getElementById('uruguay_c_dept');
let titulo = document.getElementById('texttitulo');
let lineas = document.getElementById('LINEAS');
let sudamerica = document.getElementById('SUDAMERICA');
let CENTROAMERICA = document.getElementById('CENTROAMERICA');
let screenWidthNotification = document.getElementById('screenWidthNotification');
let paisesSudamericanos = sudamerica.children;
let lineasChild = lineas.children;
let debug = document.getElementById('debug');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 0;
let scrollPos = 0;
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS, timelineL;
let closest, isScrolling, textCoord;
let isAutoScrolling = true;
let linesAreVisible = false;
let notAnimated = true;
let hideTimeout, animateTimeout, scrollDelayTimeout;
let colors = ['#291011', '#d6d6d6'];

function mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPos = window.scrollY / maxScroll;
    scrollPercent = Math.min(100, Math.max(0, Math.round(window.scrollY / maxScroll * 100)));
    console.log(scrollPercent);
    
    isScrolling = true;
    if (scrollPercent >= 0 && scrollPercent < 22 || scrollPercent >= 70 && scrollPercent <= 100) {
        body.style.backgroundColor = colors[0]; 
    }else{ 
        body.style.backgroundColor = colors[1];
    }
    if (innerWidth > 600) {
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
        }else{
            fade(zoom2);
        }
        if (scrollPercent >= 44 && scrollPercent < 58) {
            show(zoom3);
            show(UY_Dept);
            show(sudamericaMarron);
        }else{
            fade(zoom3);
            fade(UY_Dept);
        }
        if (scrollPercent >= 58 && scrollPercent < 61) {
            show(zoom4);
            show(UY);
            fade(sudamericaMarron);
            fade(sudamerica);
        }else{
            show(sudamericaMarron);
            show(centroamericaMarron);
            fade(UY);
            fade(zoom4);
        }
        if (scrollPercent >= 75) {
            fade(sudamerica);
            fade(CENTROAMERICA)
            fade(sudamericaMarron);
            fade(sudamerica);
        }
    }
    if (scrollPercent >= 33 && scrollPercent < 44) {
        if (notAnimated) {
            animateLines();
            notAnimated = false;
        }
    } else {
        hideLines();
        notAnimated = true;
        clearTimeout(hideTimeout);
        clearTimeout(animateTimeout);
        clearTimeout(scrollDelayTimeout);
    }
};

if (mobileCheck()) {
    screenWidthNotification.innerHTML = 'Por favor, rota tu dispositivo.'
    window.ontouchend = () => {
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
} else{
    screenWidthNotification.innerHTML = 'Por favor, ensancha el navegador.'

    window.onscrollend = () => {
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}


function preload() {
    currentMap = latamMap;
}

function setup(){
    if (scrollPercent >= 0 && scrollPercent < 22 || scrollPercent >= 70 && scrollPercent <= 100) {
        body.style.backgroundColor = colors[0]; 
    }else{ 
        body.style.backgroundColor = colors[1];
    }
    noCanvas();
    //POS x
    timelineX = new Timeline();
    //CONTEXTO
    timelineX.addKeyframe(0.13, 0);
    //CENTROAMERICA
    timelineX.addKeyframe(0.24, 159);
    //LATAM
    timelineX.addKeyframe(0.35, 0);
    //UY
    timelineX.addKeyframe(0.46, 897);
    //CHUY
    timelineX.addKeyframe(0.60, 1006);
    //TESTIMONIOS
    timelineX.addKeyframe(0.70, 0);
    
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 0));

    //POS Y
    timelineY = new Timeline();
    //CONTEXTO
    timelineY.addKeyframe(0.13, 974);
    //CENTROAMERICA
    timelineY.addKeyframe(0.24, 1950);
    //LATAM
    timelineY.addKeyframe(0.35, 1900);
    //UY
    timelineY.addKeyframe(0.46, 2450);
    //CHUY
    timelineY.addKeyframe(0.60, 2482);
    //TESTIMONIOS
    timelineY.addKeyframe(0.70, 1816);
    timelineY.addKeyframe(0.75, 2800);
    //SITUACION
    timelineY.addKeyframe(0.83, 3700); 
    //CONCLUSION
    timelineY.addKeyframe(0.9, 4590);

    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 5005));

    //ZOOM
    timelineZ = new Timeline();
    //CONTEXTO
    timelineZ.addKeyframe(0.13, 1);
    //CENTROAMERICA
    timelineZ.addKeyframe(0.24, 0.7);
    //LATAM
    timelineZ.addKeyframe(0.35, 1);
    //URUGUAY
    timelineZ.addKeyframe(0.46, 0.125);
    //CHUY
    timelineZ.addKeyframe(0.60, 0.05);
    //TESTIMONIOS
    timelineZ.addKeyframe(0.70, 1)

    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 1));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.13, 0);
    timelineS.addKeyframe(0.24, 0);
    timelineS.addKeyframe(0.35, 0);
    timelineS.addKeyframe(0.46, 0);
    timelineS.addKeyframe(0.60, 0);
    timelineS.addKeyframe(0.75, 0);
    timelineS.addKeyframe(0.83, 0);
    timelineS.addKeyframe(0.9, 0);
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

}

function draw(){
    let scrollPercentTimesTen = Math.min(1000, Math.max(0, Math.trunc(scrollPos * 1000)));
    
    let viewBoxArgs = timelineX.valueAt(scrollPercentTimesTen) +' '+ timelineY.valueAt(scrollPercentTimesTen)  +' '+ 1920 * timelineZ.valueAt(scrollPercentTimesTen) + ' ' + 5409.41 * timelineZ.valueAt(scrollPercentTimesTen)
    currentMap.setAttribute('viewBox', viewBoxArgs);

    if (!isScrolling && isAutoScrolling) { 
        timelineS.currentTime = scrollPos;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
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
function hideLines(){
    for (let lineaI = 0; lineaI < lineasChild.length; lineaI++) {
        setLineTransparency(lineasChild[lineaI], 'opacity', '0ms', '0ms');
        setLineAnimation(lineasChild[lineaI], 'none', '0ms', '0ms')
        lineasChild[lineaI].style.opacity = 0;
    }
    if (!notAnimated) {
        hideTimeout = setTimeout(() => {
            animateLines(); 
        }, 200);
    }
}
function animateLines(){
    let duracionInicialOpacidad = '500ms';
    let duracion = 500;
    for (let lineaI = 0; lineaI < lineasChild.length; lineaI++) {
            switch (lineaI) {
                case 10:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 3 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 2 + 'ms', duracion * 3 + 'ms');
                    break;
                case 9:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 3 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 2 + 'ms', duracion * 3 + 'ms');
                    
                    break;
                case 8:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 3 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 2 + 'ms', duracion * 3 + 'ms');
                    
                    break;
                case 7:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 6:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 5:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 4:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 3:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 2:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 4 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaRight', duracion * 3 + 'ms', duracion * 4 + 'ms');
                    
                    break;
                case 1:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 5 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', duracion * 4 + 'ms', duracion * 5 + 'ms');
                    
                    break;
                case 0:
                    setLineTransparency(lineasChild[lineaI], 'opacity', duracionInicialOpacidad, duracion * 5 + 'ms');
                    setLineAnimation(lineasChild[lineaI], 'lineaLeft', duracion * 4 + 'ms', duracion * 5 + 'ms');
                    
                    break;
                default:
                    break;
            }
            lineasChild[lineaI].style.opacity = 1;
    }
    animateTimeout = setTimeout(() => {
        if (!notAnimated) {
            scrollDelayTimeout = setTimeout(() => {
                hideLines();
            }, duracion * 8);
        }
    }, duracion * 4);
}

function calcularScrollYSegunPercent(sPercent){
    let maxScroll = body.clientHeight - window.innerHeight;
    return Math.round((sPercent / 100) * maxScroll);
}

function escrolearA(posicionY) {
    isAutoScrolling = false;
    window.scrollTo({top: posicionY, left: 0, behavior: 'smooth'});
    setTimeout(() => {
        isAutoScrolling = true;
    }, 50);
}