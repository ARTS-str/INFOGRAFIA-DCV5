let latamMap = document.getElementById('LATAM');
let uyPath = document.getElementById('UY');
let body = document.body;
let scaleTransform, xTransform, yTransform;
let scrollPercent = 1
let maxScale = 10;
let timelineX, timelineY, timelineZ, timelineS;
let closest, isScrolling;

window.onscroll = () => {
    let maxScroll = body.clientHeight - window.innerHeight;
    scrollPercent = Math.round(window.scrollY / maxScroll * 100);
    console.log(scrollPercent);
    
    isScrolling = true;
};
window.onscrollend = () => {
    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function setup(){
    //POS x
    timelineX = new Timeline();
    //CENTROAMERICA
    timelineX.addKeyframe(0.1, 180);
    timelineX.addKeyframe(0.2, 180);
    //LATAM
    timelineX.addKeyframe(0.3, 250);
    timelineX.addKeyframe(0.4, 250);
    //URUGUAY
    timelineX.addKeyframe(0.5, 330);
    timelineX.addKeyframe(0.6, 330);
    //SIG PAG
    timelineX.addKeyframe(0.7, 180);
    timelineX.addKeyframe(0.8, 180);
    timelineX.setAllValues(new Keyframe(0, 180), new Keyframe(1, 300));

    //POS Y
    timelineY = new Timeline();
    //CENTROAMERICA
    timelineY.addKeyframe(0.1, 250);
    timelineY.addKeyframe(0.2, 250);
    //LATAM
    timelineY.addKeyframe(0.3, 300);
    timelineY.addKeyframe(0.4, 300);
    //URUGUAY
    timelineY.addKeyframe(0.5, 450);
    timelineY.addKeyframe(0.6, 450);
    //SIG PAG
    timelineY.addKeyframe(0.7, 550);
    timelineY.addKeyframe(0.8, 550);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 850));

    //ZOOM
    timelineZ = new Timeline();
    //CENTROAMERICA
    timelineZ.addKeyframe(0.1, 0.3);
    timelineZ.addKeyframe(0.2, 0.3);
    //EFECTO ZOOM OUT
    timelineZ.addKeyframe(0.35, 0.5);
    //URUGUAY
    timelineZ.addKeyframe(0.5, 0.1);
    timelineZ.addKeyframe(0.6, 0.1);
    //SIG PAG
    timelineZ.addKeyframe(0.7, 0.5);
    timelineZ.addKeyframe(0.8, 0.5);


    timelineZ.setAllValues(new Keyframe(0, 0.5), new Keyframe(1, 0.06));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.1, 0);
    timelineS.addKeyframe(0.35, 0);
    timelineS.addKeyframe(0.55, 0);
    timelineS.addKeyframe(0.75, 0);
    timelineS.addKeyframe(1, 0);
}

function draw(){
    let viewBoxArgs = timelineX.valueAt(scrollPercent*10) +' '+ timelineY.valueAt(scrollPercent*10)  +' '+ 370 * timelineZ.valueAt(scrollPercent*10) + ' ' + 500 * timelineZ.valueAt(scrollPercent*10)
    latamMap.setAttribute('viewBox', viewBoxArgs);

    if (scrollPercent > 60) {  
        uyPath.style.opacity = map(scrollPercent, 60, 100, 0, 1, true);
    }

   
    timelineS.currentTime = scrollPercent * 0.01;
    if (!isScrolling) { 
        timelineS.currentTime = scrollPercent * 0.01;
        let scrollToY = calcularScrollYSegunPercent(timelineS.getClosestKeyframe().t * 100);
        window.scrollTo({top: scrollToY, left: 0, behavior: 'smooth'});
        
    }
    
}

function calcularScrollYSegunPercent(sPercent){
    let maxScroll = body.clientHeight - window.innerHeight;
    return Math.round((sPercent / 100) * maxScroll);
}
