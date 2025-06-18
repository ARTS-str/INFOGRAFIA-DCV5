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
    timelineX.addKeyframe(0.1, 400);
    timelineX.addKeyframe(0.15, 400);
    //LATAM
    timelineX.addKeyframe(0.3, 0);
    timelineX.addKeyframe(0.35, 0);
    //URUGUAY
    timelineX.addKeyframe(0.5, 1035);
    timelineX.addKeyframe(0.55,1035);
    //SIG PAG
    timelineX.addKeyframe(0.7, 0);
    timelineX.addKeyframe(0.75,0);
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 300));

    //POS Y
    timelineY = new Timeline();
    //CENTROAMERICA
    timelineY.addKeyframe(0.1, 1150);
    timelineY.addKeyframe(0.15, 1150);
    //LATAM
    timelineY.addKeyframe(0.3, 1150);
    timelineY.addKeyframe(0.35, 1150);
    //URUGUAY
    timelineY.addKeyframe(0.5, 1800);
    timelineY.addKeyframe(0.55,1800);
    //SIG PAG
    timelineY.addKeyframe(0.7,  2300);
    timelineY.addKeyframe(0.75, 2300);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 2000));

    //ZOOM
    timelineZ = new Timeline();
    //CENTROAMERICA
    timelineZ.addKeyframe(0.1, 0.8);
    timelineZ.addKeyframe(0.15,0.8);
    //LATAM
    timelineZ.addKeyframe(0.3, 1.5);
    timelineZ.addKeyframe(0.35, 1.5);
    //URUGUAY
    timelineZ.addKeyframe(0.5, 0.2);
    timelineZ.addKeyframe(0.55,0.2);
    //SIG PAG
    timelineZ.addKeyframe(0.7, 1.4);
    timelineZ.addKeyframe(0.75,1.4);


    timelineZ.setAllValues(new Keyframe(0, 1.4), new Keyframe(1, 0.06));

    //POSICION DE LAS PARADAS EN EL SCROLL
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.1, 0);
    timelineS.addKeyframe(0.35, 0);
    timelineS.addKeyframe(0.55, 0);
    timelineS.addKeyframe(0.75, 0);
    timelineS.addKeyframe(1, 0);
}

function draw(){
    let viewBoxArgs = timelineX.valueAt(scrollPercent*10) +' '+ timelineY.valueAt(scrollPercent*10)  +' '+ window.innerWidth * timelineZ.valueAt(scrollPercent*10) + ' ' + window.innerHeight * timelineZ.valueAt(scrollPercent*10)
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
