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
    timelineX.addKeyframe(0.3, 150);
    timelineX.addKeyframe(0.4, 150);
    //URUGUAY
    timelineX.addKeyframe(0.5, 200);
    timelineX.addKeyframe(0.6, 200);
    timelineX.setAllValues(new Keyframe(0, 0), new Keyframe(1, 260));

    //POS Y
    timelineY = new Timeline();
    //CENTROAMERICA
    timelineY.addKeyframe(0.3, 180);
    timelineY.addKeyframe(0.4, 180);
    //URUGUAY
    timelineY.addKeyframe(0.5, 300);
    timelineY.addKeyframe(0.6, 300);
    timelineY.setAllValues(new Keyframe(0, 0), new Keyframe(1, 368));

    //ZOOM
    timelineZ = new Timeline();
    //CENTROAMERICA
    timelineZ.addKeyframe(0.3, 0.3);
    timelineZ.addKeyframe(0.4, 0.3);
    //EFECTO ZOOM OUT
    timelineZ.addKeyframe(0.45, 0.4);
    //URUGUAY

    timelineZ.setAllValues(new Keyframe(0, 1), new Keyframe(1, 0.06));

    //PARADAS
    timelineS = new Timeline();
    timelineS.addKeyframe(0, 0);
    timelineS.addKeyframe(0.3, 0);
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
